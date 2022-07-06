---
title: 使用brew services管理服务
categories:
  - 01.开发学习笔记 markdown
  - 01.环境配置安装
  - mac开发环境
  - mac中brew的使用
---
macOS使用launchctl 命令加载、卸载开机自动运行的服务
在 OS X 中，服务本身存储在 .plist 文件中（即 property list），
这些文件的位置一般在 ~/Library/LaunchAgents 或 /Library/LaunchAgents。
可以使用 
`launchctl load $PATH_TO_LIST` 
和
`launchctl unload $PATH_TO_LIST`
命令来加载/卸载他们。加载就是允许这个程序开机执行，卸载反之。

如果按上面的说明操作的话，未免太麻烦了，而且也很难记住 plist 的位置。还好 Homebrew 提供了一个易用的接口来管理 plist，然后你就不用再纠结什么 ln，launchctl，和 plist 的位置了。
brew service可以简化lauchctl的操作。

以MySQL为例，如果使用launchctl命令来开机启动:
```
ln -sfv /usr/local/opt/mysql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
```


如使用brew services可以简化为:
`brew services start mysql`

常用命令
```
brew services list  # 查看使用brew安装的服务列表
brew services run formula|--all  # 启动服务（仅启动不注册）
brew services start formula|--all  # 启动服务，并注册
brew services stop formula|--all   # 停止服务，并取消注册
brew services restart formula|--all  # 重启服务，并注册
brew services cleanup  # 清除已卸载应用的无用的配置
```

配置文件目录

```
/Library/LaunchDaemons # 开机自启，需要sudo
~/Library/LaunchAgents # 用户登录后自启
```

最后一提：
以homebrew.mxcl.kafka.plist为例：
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>homebrew.mxcl.kafka</string>
    <key>WorkingDirectory</key>
    <string>/usr/local</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/opt/kafka/bin/kafka-server-start</string>
        <string>/usr/local/etc/kafka/server.properties</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardErrorPath</key>
    <string>/usr/local/var/log/kafka/kafka_output.log</string>
    <key>StandardOutPath</key>
    <string>/usr/local/var/log/kafka/kafka_output.log</string>
</dict>
</plist>

```

在这里可以找到服务路径、启动参数、日志路径等
