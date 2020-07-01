class Message {
  constructor() {
      this.root = this.generateElement('div', 'neumorphic-messagebox');
      this.topList = [];
      this.root.style.display = 'inline';
      this.root.style.height = '0';
      document.body.appendChild(this.root);
  }
  // 单例模式
  static getInstance() {
      if (!Message.instance) {
          Message.instance = new Message();
      }
      return Message.instance;
  }
  send(config) {
      // 默认配置
      const DEFAULT_MESSAGE_CONFIG = {
          message: 'Default Message',
          type: 'info',
          styleTimeout: 2000,
          removeTimeout: 3000,
      };
      this.generateMessageBox(Object.assign(DEFAULT_MESSAGE_CONFIG, config));
  }
  generateMessageBox(config) {
      const messageBox = this.generateElement('div', '', config.type);
      this.topList.push(1);
      const message = this.generateElement('p', 'neumorphic-messagebox-text', config.type);
      message.appendChild(document.createTextNode(config.message));
      messageBox.appendChild(message);
      this.root.appendChild(messageBox);
      setTimeout(() => {
          messageBox.style.transform = 'translate(50%, -100px)';
      }, config.styleTimeout);
      setTimeout(() => {
          this.root.removeChild(messageBox);
          this.topList.pop();
      }, config.removeTimeout);
  }
  generateElement(element, className, type) {
      const ele = document.createElement(element);
      if (className && element === 'p') {
          ele.className = `${className}-${type} ${className}`;
      }
      else if (className) {
          ele.className = className;
      }
      return ele;
  }
}
export default Message.getInstance();
