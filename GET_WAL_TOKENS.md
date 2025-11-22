# 💧 Walrus Testnet WAL 代币领取指南

## 🎯 您的 Sui 地址
```
0x28f9c1be843850dc294d49b92f05ac131500042ad2ac61a2a14de3740000f76e
```

---

## 📍 **领取 WAL 代币的方法**

### **方法 1: Walrus Staking 网站（推荐）**

这是最直接的方法，可以用 Testnet SUI 兑换 WAL：

1. **访问 Walrus Staking 网站**
   - 网址：https://stake.walrus.site
   - 或：https://testnet.walrus.site

2. **连接钱包**
   - 点击 "Connect Wallet"
   - 选择 Sui Wallet 或其他兼容钱包
   - 确保钱包切换到 **Testnet** 网络

3. **获取 WAL 代币**
   - 在网站上找到 "Get WAL" 或类似按钮
   - 使用 Testnet SUI 兑换 WAL 代币
   - 通常需要至少 1 WAL 用于质押

---

### **方法 2: Stakely.io Faucet**

第三方 faucet 服务：

1. **访问 Stakely Walrus Faucet**
   - 网址：https://stakely.io/faucet/walrus-wal

2. **填写信息**
   - 输入您的 Sui 地址：
     ```
     0x28f9c1be843850dc294d49b92f05ac131500042ad2ac61a2a14de3740000f76e
     ```
   - 完成验证码（CAPTCHA）
   - 可能需要在 Twitter 分享请求 ID

3. **等待接收**
   - 通常几分钟内会收到 WAL 代币

---

### **方法 3: Sui Discord Faucet**

如果您需要先获取 Testnet SUI（用于方法 1）：

1. **加入 Sui Discord**
   - 网址：https://discord.gg/sui

2. **找到 Faucet 频道**
   - 频道：`#testnet-faucet`

3. **使用命令**
   ```
   !faucet 0x28f9c1be843850dc294d49b92f05ac131500042ad2ac61a2a14de3740000f76e
   ```

4. **获取 SUI 后**
   - 使用方法 1 在 stake.walrus.site 兑换 WAL

---

### **方法 4: CLI Faucet（开发者选项）**

如果您熟悉命令行：

```bash
# 使用 Walrus CLI 获取 WAL（如果支持）
walrus faucet
```

---

## ✅ **推荐流程**

### **Step 1: 确保有 Testnet SUI**

先检查您的 SUI 余额：
```bash
sui client gas
```

如果 SUI 不足，从 Sui Discord faucet 获取。

### **Step 2: 访问 Walrus Staking 网站**

最简单的方法：
1. 访问：https://stake.walrus.site
2. 连接钱包（确保是 Testnet）
3. 点击 "Get WAL" 用 SUI 兑换 WAL

### **Step 3: 验证 WAL 余额**

获取 WAL 后验证：
```bash
sui client gas
sui client objects
```

---

## 🔗 **重要链接**

| 服务 | 链接 |
|------|------|
| **Walrus Staking** | https://stake.walrus.site |
| **Stakely Faucet** | https://stakely.io/faucet/walrus-wal |
| **Sui Discord** | https://discord.gg/sui |
| **Walrus 文档** | https://docs.wal.app |

---

## 📝 **获取 WAL 后的操作**

成功获取 WAL 代币后：

1. **验证余额**
   ```bash
   sui client gas
   ```

2. **上传文件到 Walrus**
   ```bash
   walrus store --epochs 5 test_data.json
   ```

3. **记录 Blob ID**
   从输出中复制 Blob ID

4. **更新 Tusk Demo**
   ```bash
   # 编辑 sdk/demo.ts，更新第 119 行
   const exampleBlobId = '<YOUR_BLOB_ID>';
   ```

5. **运行完整测试**
   ```bash
   cd sdk
   pnpm demo
   ```

---

## 💡 **提示**

- **Testnet 代币是免费的**，用于测试目的
- 如果一个 faucet 不工作，尝试另一个
- 确保钱包始终在 **Testnet** 网络
- WAL 代币用于支付 Walrus 存储费用

---

## 🆘 **遇到问题？**

1. **检查网络设置**：确保钱包在 Testnet
2. **验证地址**：确保使用正确的 Sui 地址
3. **等待时间**：有些 faucet 可能需要几分钟
4. **Discord 帮助**：在 Sui 或 Walrus Discord 寻求帮助

---

**准备好了吗？建议从方法 1（Walrus Staking 网站）开始！** 🚀
