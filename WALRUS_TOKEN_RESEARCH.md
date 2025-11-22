# 🔍 Walrus Testnet 上传代币调研报告

**调研时间**: 2025-11-22  
**调研目的**: 确定 Walrus Testnet 上传需要的代币类型及获取方式

---

## 📊 **核心发现**

### ✅ **Walrus Testnet 上传需要 WAL 代币**

根据官方文档和多个来源确认：

1. **存储费用**: 使用 **WAL 代币** 支付
2. **Gas 费用**: 使用 **SUI 代币** 支付（Sui 链上交易）
3. **兑换比例**: Testnet 上 SUI:WAL = 1:1

---

## 💰 **代币用途详解**

### **WAL 代币**
- **用途**: 支付 Walrus 存储费用
- **计费单位**: FROST (1 WAL = 1,000,000,000 FROST)
- **价格示例** (根据 `walrus info`):
  - 每个编码存储单元: 0.0001 WAL
  - 每次写入附加费: 25,000 FROST
  - 小文件 (217 字节): ~0.049 WAL (5 epochs)

### **SUI 代币**
- **用途**: 支付 Sui 链上的 gas 费用
- **交易类型**:
  - 获取存储资源
  - 注册 blob
  - 认证 blob 可用性

---

## 🎯 **如何获取正确的 WAL 代币**

### **方法 1: 使用 `walrus get-wal` 命令（推荐）**

这是官方推荐的方法！

#### **步骤 1: 确保有 Testnet SUI**
```bash
# 检查 SUI 余额
sui client gas

# 如果需要，从 Sui Discord 获取
# 在 #testnet-faucet 频道输入:
!faucet <your-sui-address>
```

#### **步骤 2: 使用 walrus get-wal 命令**
```bash
# 默认兑换 0.5 SUI → 0.5 WAL
walrus get-wal

# 或指定金额（单位: MIST/FROST）
# 1 SUI = 1,000,000,000 MIST
# 兑换 1 SUI:
walrus get-wal --amount 1000000000

# 兑换 2 SUI:
walrus get-wal --amount 2000000000
```

#### **步骤 3: 验证 WAL 余额**
```bash
# 查看所有代币余额
sui client balance

# 或查看所有对象
sui client objects
```

---

### **方法 2: 使用 Walrus Staking 网站**

#### **步骤 1: 访问 Staking 网站**
```
https://stake.walrus.site/
```

#### **步骤 2: 连接钱包**
- 确保钱包切换到 **Testnet** 网络
- 点击 "Connect Wallet"

#### **步骤 3: 兑换 WAL**
- 找到 "Get WAL" 按钮
- 输入要兑换的 SUI 数量
- 确认交易

---

## ⚠️ **您当前的问题分析**

### **问题症状**
```
Error: could not find WAL coins with sufficient balance
```

### **可能原因**

1. **WAL 代币类型不匹配**
   - 您的 WAL: `0x8190b041...::wal::WAL`
   - 这可能不是通过官方 `walrus get-wal` 获得的

2. **获取来源不正确**
   - 可能从第三方 faucet 获得
   - 可能是旧版本的 WAL 代币

3. **需要重新获取**
   - 使用官方 `walrus get-wal` 命令
   - 或通过官方 Staking 网站

---

## 🔧 **解决方案**

### **推荐操作流程**

#### **1. 检查当前 SUI 余额**
```bash
sui client gas
```

#### **2. 如果 SUI 不足，获取 Testnet SUI**
```bash
# 方法 A: Sui Discord
# 在 #testnet-faucet 频道:
!faucet 0x28f9c1be843850dc294d49b92f05ac131500042ad2ac61a2a14de3740000f76e

# 方法 B: Sui Wallet 内置 faucet
# 在钱包设置中点击 "Request Testnet SUI"
```

#### **3. 使用官方命令兑换 WAL**
```bash
# 兑换 2 SUI 为 2 WAL (足够上传多次)
walrus get-wal --amount 2000000000
```

#### **4. 验证新的 WAL 代币**
```bash
# 查看余额
sui client balance

# 查看对象详情
sui client objects
```

#### **5. 重新尝试上传**
```bash
walrus store --epochs 5 test_data.json
```

---

## 📝 **walrus get-wal 命令详解**

### **基本用法**
```bash
# 查看帮助
walrus get-wal --help

# 默认兑换 (0.5 SUI → 0.5 WAL)
walrus get-wal

# 指定金额 (单位: MIST)
walrus get-wal --amount <AMOUNT_IN_MIST>

# 使用特定的 exchange object
walrus get-wal --exchange-id <EXCHANGE_OBJECT_ID>
```

### **金额计算**
```
1 SUI = 1,000,000,000 MIST
1 WAL = 1,000,000,000 FROST

兑换示例:
- 0.5 SUI = 500,000,000 MIST
- 1 SUI = 1,000,000,000 MIST
- 2 SUI = 2,000,000,000 MIST
```

---

## 🎯 **立即行动计划**

### **Step 1: 检查 SUI 余额**
```bash
sui client gas
```

**您当前有**: ~0.93 SUI ✅ 足够

### **Step 2: 使用官方命令获取 WAL**
```bash
# 兑换 0.5 SUI 为 0.5 WAL (足够测试)
walrus get-wal

# 或兑换更多
walrus get-wal --amount 1000000000  # 1 SUI → 1 WAL
```

### **Step 3: 验证**
```bash
sui client balance
```

### **Step 4: 上传文件**
```bash
walrus store --epochs 5 test_data.json
```

---

## 📚 **官方文档参考**

- **Walrus CLI 文档**: https://docs.wal.app/usage/client-cli.html
- **Walrus 配置**: https://docs.wal.app/usage/setup.html
- **Staking 网站**: https://stake.walrus.site/
- **Sui Testnet Faucet**: Discord #testnet-faucet

---

## ✅ **总结**

### **关键要点**

1. ✅ **Walrus Testnet 上传需要 WAL 代币**（不是 SUI）
2. ✅ **获取 WAL 的正确方法**: 使用 `walrus get-wal` 命令
3. ✅ **兑换比例**: 1 SUI = 1 WAL (Testnet)
4. ✅ **您需要做的**: 运行 `walrus get-wal` 获取官方 WAL 代币

### **为什么之前失败**

您之前获得的 WAL 代币可能：
- 不是通过官方 `walrus get-wal` 获得
- 代币类型与 Walrus CLI 期望的不匹配
- 需要使用官方方法重新获取

---

**建议**: 立即运行 `walrus get-wal` 命令，这将解决您的问题！🚀
