#!/bin/sh

# 脚本会在执行到任何一个返回非0的命令时立即停止执行，而不会继续往下执行
set -e

# 获取当前脚本所在目录的绝对路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}")/../scripts" && pwd )"

# 读取 package.json 文件中的数据
TAG_PATH="$SCRIPT_DIR/tag.txt"

# 使用cat命令读取文件内容
if [ -f "$TAG_PATH" ]; then
    CONTENT=$(cat "$TAG_PATH")
    echo "File content: $CONTENT"
else
    echo "Error: $TAG_PATH not found in the current directory."
fi

echo $CONTENT


cd ../packages/ui
pnpm i --frozen-lockfile
pnpm update:version

pnpm build

# pnpm publish --no-git-checks --tag $CONTENT

cd -

echo "✅ Publish completed"
