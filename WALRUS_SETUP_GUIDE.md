# 🌊 Walrus CLI 安装和使用指南

## 📋 目录
1. [安装 Walrus CLI](#安装-walrus-cli)
2. [配置 Walrus](#配置-walrus)
3. [上传文件到 Walrus](#上传文件到-walrus)
4. [验证上传](#验证上传)

---

## 🔧 安装 Walrus CLI

### **方法 1: 使用安装脚本（推荐 - Ubuntu/Linux）**

这是最简单的方法，适用于 Ubuntu 和大多数 Linux 发行版。

#### **安装 Testnet 版本（用于测试）**

```bash
# 安装 Walrus Testnet 版本
curl -sSf https://install.wal.app | sh -s -- -n testnet
```

#### **安装后配置 PATH**

安装脚本会将 `walrus` 安装到 `$HOME/.local/bin` 目录。确保该目录在您的 PATH 中：

```bash
# 检查 PATH
echo $PATH | grep -q "$HOME/.local/bin" && echo "✅ PATH 已配置" || echo "❌ 需要配置 PATH"

# 如果需要，添加到 PATH（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

#### **验证安装**

```bash
# 检查 Walrus 版本
walrus --version

# 查看帮助信息
walrus --help
```

---

### **方法 2: 手动下载二进制文件**

如果脚本安装失败，可以手动下载：

```bash
# 下载 Ubuntu x86_64 版本（Testnet）
wget https://storage.googleapis.com/mysten-walrus-binaries/walrus-testnet-latest-ubuntu-x86_64 -O walrus

# 添加执行权限
chmod +x walrus

# 移动到 PATH 目录
sudo mv walrus /usr/local/bin/

# 验证
walrus --version
```

---

### **方法 3: 通过 Cargo 安装（开发者选项）**

如果您已安装 Rust 和 Cargo：

```bash
# 安装 Testnet 版本
cargo install --git https://github.com/MystenLabs/walrus --branch testnet walrus-service --locked
```

---

## ⚙️ 配置 Walrus

### **初始化配置**

Walrus 会自动创建配置文件，但您可以手动初始化：

```bash
# Walrus 配置文件位置
# ~/.config/walrus/client_config.yaml (Linux)
# ~/Library/Application Support/walrus/client_config.yaml (macOS)

# 查看当前配置
walrus info
```

### **配置 Testnet**

默认情况下，如果您安装了 Testnet 版本，它会自动配置为使用 Testnet。

---

## 📤 上传文件到 Walrus

### **上传 test_data.json**

现在让我们上传您的测试数据文件：

```bash
# 进入项目目录
cd /home/evan/otterlabs/tusk

# 上传文件到 Walrus Testnet
walrus store test_data.json
```

### **预期输出**

成功上传后，您会看到类似以下的输出：

```
Storing blob...
Blob ID: <BLOB_ID_HERE>
Storage nodes: ...
Epochs: 5
Cost: ... WAL
```

**重要：** 记录下 `Blob ID`，这是您需要在 Tusk SDK 中使用的 ID！

---

## ✅ 验证上传

### **方法 1: 使用 Walrus CLI 读取**

```bash
# 使用 Blob ID 读取文件
walrus read <BLOB_ID>

# 或者保存到文件
walrus read <BLOB_ID> -o downloaded.json

# 验证内容
cat downloaded.json
```

### **方法 2: 使用 HTTP Aggregator**

```bash
# 使用 curl 从 Walrus Aggregator 获取
curl https://aggregator.walrus-testnet.walrus.space/v1/blobs/<BLOB_ID>
```

### **方法 3: 在浏览器中查看**

访问：
```
https://aggregator.walrus-testnet.walrus.space/v1/blobs/<BLOB_ID>
```

---

## 🎯 完整示例流程

### **Step 1: 安装 Walrus**

```bash
# 安装 Testnet 版本
curl -sSf https://install.wal.app | sh -s -- -n testnet

# 配置 PATH
export PATH="$HOME/.local/bin:$PATH"

# 验证
walrus --version
```

### **Step 2: 上传测试数据**

```bash
# 进入项目目录
cd /home/evan/otterlabs/tusk

# 查看要上传的文件
cat test_data.json

# 上传到 Walrus
walrus store test_data.json
```

### **Step 3: 记录 Blob ID**

从输出中复制 Blob ID，例如：
```
Blob ID: ABC123XYZ...
```

### **Step 4: 更新 Tusk Demo**

```bash
# 编辑 demo 文件
nano sdk/demo.ts

# 找到第 119 行，替换为您的 Blob ID：
const exampleBlobId = 'ABC123XYZ...';  // 替换为您的实际 Blob ID
```

### **Step 5: 运行 Tusk Demo**

```bash
cd sdk
pnpm demo
```

### **预期结果**

```
✅ Blob fetched successfully
✅ VALIDATION PASSED!
🎖️  Creating on-chain attestation...
✅ Attestation created!
🎉 Blob is valid! Attestation created: <tx_digest>
```

---

## 🔍 常见问题

### **Q: 安装脚本失败怎么办？**
A: 使用方法 2 手动下载二进制文件。

### **Q: walrus 命令找不到？**
A: 确保 `$HOME/.local/bin` 在您的 PATH 中：
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### **Q: 上传需要付费吗？**
A: Testnet 是免费的，但您需要有 Testnet WAL 代币。可以从 Discord 获取。

### **Q: 如何获取 Testnet WAL 代币？**
A: 访问 [Walrus Discord](https://discord.gg/walrus) 并使用 faucet 命令。

### **Q: Blob 会永久存储吗？**
A: Testnet 数据可能会定期清除。Mainnet 数据会根据您支付的 epochs 存储。

---

## 📚 相关资源

- **官方文档**: https://docs.wal.app
- **GitHub**: https://github.com/MystenLabs/walrus
- **Discord**: https://discord.gg/walrus
- **Testnet Aggregator**: https://aggregator.walrus-testnet.walrus.space

---

## 🎉 快速命令参考

```bash
# 安装 Walrus Testnet
curl -sSf https://install.wal.app | sh -s -- -n testnet

# 上传文件
walrus store <file>

# 读取 blob
walrus read <blob_id>

# 查看信息
walrus info

# 查看帮助
walrus --help
```

---

**准备好了吗？让我们开始安装 Walrus！** 🚀
