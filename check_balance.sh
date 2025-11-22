#!/bin/bash
# 检查 WAL 代币余额脚本

echo "🔍 检查 Sui 账户信息..."
echo ""
echo "📍 当前活跃地址:"
sui client active-address
echo ""
echo "💰 所有代币余额:"
sui client gas
echo ""
echo "📦 所有对象:"
sui client objects | head -20
echo ""
echo "✅ 检查完成！"
