#!/bin/sh

# 脚本会在执行到任何一个返回非0的命令时立即停止执行，而不会继续往下执行
set -e

pnpm -C ../packages/ui i
pnpm -C ../packages/ui build
pnpm update:version

# 使用cat命令读取文件内容
TAG_PATH="./tag.txt"

if [ -f "$TAG_PATH" ]; then
    CONTENT=$(cat "$TAG_PATH")
    echo "File content: $CONTENT"
else
    echo "Error: $TAG_PATH not found in the current directory."
fi

echo $CONTENT

cd ../packages/ui
pnpm publish --no-git-checks --tag $CONTENT
cd -

echo "✅ Publish completed"
