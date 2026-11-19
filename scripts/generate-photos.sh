#!/bin/bash
# ダミー期間用の写真を AI（Codex 組み込みの image_gen / gpt-image-2）で生成する。
# 人物の顔は作らない（作り物の質感が出るため）。手元・器具・ジムの様子だけ。
#   bash scripts/generate-photos.sh          … まだ無い写真だけ作る
#   FORCE=1 bash scripts/generate-photos.sh  … すべて作り直す
set -u
cd "$(dirname "$0")/.."
mkdir -p public/images/trainer public/images/interview public/images/top
LOG_DIR=artifacts/photos
mkdir -p "$LOG_DIR"

STYLE="Photorealistic editorial photograph for a Japanese fitness magazine. The trainer never touches the client's body (no physical contact). NO faces visible (faces out of frame or cropped), no text, no logos, no brand marks, no watermark. Japan, clean modern gym, cool neutral daylight with soft shadows, slightly desaturated natural colors, shallow depth of field, calm and focused atmosphere, natural textures of rubber floor, steel and chalk."

gen() { # gen <公開するパス（.jpg）> <サイズ> <プロンプト>
  if [ -f "$1" ] && [ "${FORCE:-0}" != "1" ]; then echo "あり: $1"; return; fi
  local raw="$LOG_DIR/$(basename "${1%.jpg}").png"
  codex exec --sandbox workspace-write --skip-git-repo-check --cd "$PWD" "Codex 組み込みの image_gen ツール（gpt-image-2）を直接呼んで画像を1枚作ってください。
API キーも Python/Node スクリプトも不要です。

プロンプト: '$3'
サイズ: $2
保存先: $raw" > "$LOG_DIR/$(basename "$1").log" 2>&1
  sips -s format jpeg -s formatOptions 86 "$raw" --out "$1" > /dev/null && file "$1"
}

T=public/images/trainer
I=public/images/interview
# トレーナーの写真（縦 4:5。カードと記事の冒頭）
gen $T/mihon-ken.jpg 1024x1280 "A male personal trainer's hands spotting the barbell of a person doing a bench press in a power rack, chalk on the knurling, weight plates on the bar, shot from the side at chest height, faces out of frame. $STYLE" &
gen $T/kari-mio.jpg 1024x1280 "A female personal trainer in a dark t-shirt holding a clipboard with a training log sheet and a pen, standing next to a light dumbbell rack in a small bright private gym, cropped at the shoulders so the face is out of frame. $STYLE" &
gen $T/tameshi-yu.jpg 1024x1280 "A conditioning trainer standing a step back with arms loosely crossed, holding a small tablet, watching a client in a loose long-sleeve top do a slow cable row in a quiet studio gym; clear distance between them, NO physical contact, cropped so both faces are out of frame. $STYLE" &
wait
gen $T/hinagata-saki.jpg 1024x1280 "A female trainer kneeling on a soft gray mat beside a small exercise ball and a resistance band, demonstrating a gentle floor exercise with her hands, a small kids corner with soft toys blurred in the background, faces out of frame. $STYLE" &
gen $T/sanko-ryo.jpg 1024x1280 "A trainer's hand holding a stopwatch beside a sled push lane on artificial turf inside a large fitness gym, an athlete's legs in motion pushing the sled blurred in the background, faces out of frame. $STYLE" &
gen $T/reiji-naoto.jpg 1024x1280 "A personal trainer's hands adjusting the seat pin of a chest press machine in a stylish dim private gym with a large mirror, faces out of frame. $STYLE" &
wait
# 取材記事の本文に入れる写真（ジムの様子・道具。人は入れない）
gen $I/mihon-ken-rack.jpg 1536x1024 "Empty power rack with a loaded barbell on the j-hooks, colorful competition bumper plates (red, blue, yellow, green) stacked on a plate tree nearby, chalk bowl, rubber floor, wide shot, nobody in frame. $STYLE" &
gen $I/mihon-ken-notebook.jpg 1536x1024 "Close-up of an open training notebook with a handwritten-style table grid (no readable text), a pencil, and a small chalk-dusted lifting belt on a wooden bench, nobody in frame. $STYLE" &
gen $I/kari-mio-room.jpg 1536x1024 "Interior of a small private personal training room with nobody in it: one adjustable bench, a compact dumbbell rack, a large mirror, a small table with a tablet and a water bottle, clean light wood and gray walls, wide shot. $STYLE" &
wait
gen $I/kari-mio-meal.jpg 1536x1024 "Overhead still life on a table: a simple Japanese home-cooked meal (rice, grilled fish, miso soup, vegetables) next to a smartphone with a blank screen and a small notebook, nobody in frame. $STYLE" &
gen $I/tameshi-yu-studio.jpg 1536x1024 "Interior of a quiet small conditioning studio with nobody in it: a cable machine, foam rollers lined up, a long mirror, a padded treatment bench, wooden floor, soft window light, wide shot. $STYLE" &
gen $I/tameshi-yu-tools.jpg 1536x1024 "Still life on a gray rubber floor: a foam roller, a resistance band loop, a small massage ball and a light kettlebell arranged neatly, nobody in frame. $STYLE" &
wait
gen $I/hinagata-saki-studio.jpg 1536x1024 "Interior of a bright small women's fitness studio with nobody in it: gray mats, exercise balls, light dumbbells on a low shelf, a corner with a baby bouncer chair and soft toys, wide shot. $STYLE" &
gen $I/hinagata-saki-band.jpg 1536x1024 "Close-up still life on a mat: colorful resistance bands, a small soft ball and a stopwatch, nobody in frame. $STYLE" &
gen $I/sanko-ryo-turf.jpg 1536x1024 "Wide shot of a functional training area inside a large fitness gym with nobody in it: artificial turf lane with a sled, plyometric boxes, agility ladder on the turf, kettlebells, wide shot. $STYLE" &
wait
gen $I/sanko-ryo-plyo.jpg 1536x1024 "Close-up of stacked wooden plyometric boxes and a medicine ball on artificial turf in a gym, nobody in frame. $STYLE" &
gen $I/reiji-naoto-gym.jpg 1536x1024 "Interior of a stylish private personal gym with nobody in it: dark walls, warm spot lighting, a smith machine, an adjustable bench, a cable crossover, a large mirror, wide shot. $STYLE" &
gen $I/reiji-naoto-online.jpg 1536x1024 "A laptop on a small stand in a gym showing a blank video call screen (no readable text), a pair of light dumbbells and a yoga mat in front, nobody in frame. $STYLE" &
wait
# トップの写真
gen public/images/top/chalk.jpg 1536x1024 "Extreme close-up of chalked hands of a lifter about to grip a knurled steel barbell, chalk dust floating in the light, faces out of frame. $STYLE" &
gen public/images/top/talk.jpg 1536x1024 "A trainer and a client sitting on a gym bench facing each other, talking during a counseling session, seen from behind at waist height, a clipboard on the trainer's knee, faces out of frame. $STYLE" &
wait
echo "完了。public/images/ を確認してください。"
