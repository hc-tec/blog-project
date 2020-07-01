const generateElement = (element, className) => {
  const ele = document.createElement(element);
  // tslint:disable-next-line:no-unused-expression
  className && (ele.className = className);
  return ele;
};
export class MessageBox {
  constructor() {
      // 元素标签
      this.messageWrapper = generateElement('div', 'neumorphic-message-wrapper');
      this.layer = generateElement('div', 'neumorphic-message-layer');
      this.messageContent = generateElement('div', 'neumorphic-message-content');
      this.messageHeader = generateElement('div', 'neumorphic-message-header');
      this.messageBody = generateElement('div', 'neumorphic-message-body');
      this.messageBtnWrapper = generateElement('div', 'neumorphic-message-btn');
      this.confirmBtn = generateElement('button', 'neumorphic-btn');
      this.cancelBtn = generateElement('button', 'neumorphic-btn');
  }
  // 单例模式
  static getInstance() {
      if (!MessageBox.instance) {
          MessageBox.instance = new MessageBox();
      }
      return MessageBox.instance;
  }
  alert(message) {
      const DEFAULT_MESSAGE_CONFIG = {
          title: 'Default Title',
          message: 'Default Message',
          confirmBtnText: '确认',
          callback: () => (void 0),
      };
      this.generateAlertMessage(Object.assign(DEFAULT_MESSAGE_CONFIG, message));
  }
  confirm(message) {
      const DEFAULT_MESSAGE_CONFIG = {
          title: 'Default Title',
          message: 'Default Message',
          confirmBtnText: '确认',
          cancelBtnText: '取消',
          resolve: () => (void 0),
          reject: () => (void 0),
      };
      this.generateConfirmMessage(Object.assign(DEFAULT_MESSAGE_CONFIG, message));
  }
  prompt(message) {
      const DEFAULT_MESSAGE_CONFIG = {
          title: 'Default Title',
          message: 'Default Message',
          confirmBtnText: '确认',
          cancelBtnText: '取消',
          resolve: () => (void 0),
          reject: () => (void 0),
      };
      this.generatePromptMessage(Object.assign(DEFAULT_MESSAGE_CONFIG, message));
  }
  destroy() {
      // 按钮组销毁，防止干扰
      this.messageBtnWrapper.innerHTML = '';
      this.messageBody.innerHTML = '';
      document.body.removeChild(this.messageWrapper);
      document.body.removeChild(this.layer);
  }
  generateAlertMessage(message) {
      // 事件挂载
      this.confirmBtn.onclick = () => {
          message.callback('confirm');
          this.destroy();
          // 滑轮解锁
          document.body.style.overflow = 'auto';
      };
      // 挂载
      this.messageHeader.innerHTML = message.title;
      this.messageBody.innerHTML = message.message;
      this.confirmBtn.innerHTML = message.confirmBtnText;
      this.confirmBtn.style.padding = '12px 40px';
      this.confirmBtn.style.color = 'var(--second-color)';
      this.messageBtnWrapper.appendChild(this.confirmBtn);
      this.messageContent.appendChild(this.messageHeader);
      this.messageContent.appendChild(this.messageBody);
      this.messageContent.appendChild(this.messageBtnWrapper);
      this.messageWrapper.appendChild(this.messageContent);
      document.body.appendChild(this.messageWrapper);
      document.body.appendChild(this.layer);
      // 锁定滑轮
      document.body.style.overflow = 'hidden';
  }
  generateConfirmMessage(message) {
      // confirm 事件挂载
      this.confirmBtn.onclick = () => {
          this.destroy();
          // 滑轮解锁
          document.body.style.overflow = 'auto';
          message.resolve('confirm');
      };
      // cancel 事件挂载
      this.cancelBtn.onclick = () => {
          this.destroy();
          // 滑轮解锁
          document.body.style.overflow = 'auto';
          message.reject('cancel');
      };
      // 挂载
      this.messageHeader.innerHTML = message.title;
      this.messageBody.innerHTML = message.message;
      this.confirmBtn.innerHTML = message.confirmBtnText;
      this.confirmBtn.style.padding = '12px 40px';
      this.confirmBtn.style.color = 'var(--second-color)';
      this.cancelBtn.innerHTML = message.cancelBtnText;
      this.cancelBtn.style.padding = '12px 40px';
      this.cancelBtn.style.color = 'var(--error-color)';
      this.messageBtnWrapper.appendChild(this.cancelBtn);
      this.messageBtnWrapper.appendChild(this.confirmBtn);
      this.messageContent.appendChild(this.messageHeader);
      this.messageContent.appendChild(this.messageBody);
      this.messageContent.appendChild(this.messageBtnWrapper);
      this.messageWrapper.appendChild(this.messageContent);
      document.body.appendChild(this.messageWrapper);
      document.body.appendChild(this.layer);
      // 锁定滑轮
      document.body.style.overflow = 'hidden';
  }
  generatePromptMessage(message) {
      const messageBodyText = generateElement('p');
      const messageInput = generateElement('input', 'neumorphic-input');
      const confirmEvent = () => {
          message.resolve(messageInput.value);
          // 滑轮解锁
          document.body.style.overflow = 'auto';
          this.destroy();
      };
      messageInput.addEventListener('keydown', (event) => {
          // tslint:disable-next-line:no-unused-expression
          event.code === 'Enter' ? confirmEvent() : () => (messageInput.focus());
      });
      // confirm 事件挂载
      this.confirmBtn.onclick = confirmEvent;
      // cancel 事件挂载
      this.cancelBtn.onclick = () => {
          this.destroy();
          // 滑轮解锁
          document.body.style.overflow = 'auto';
          message.reject('cancel');
      };
      // 窗口一弹出 input 获取焦点
      this.messageWrapper.onmouseenter = () => {
          messageInput.focus();
      };
      // 挂载
      this.messageHeader.innerHTML = message.title;
      messageBodyText.innerHTML = message.message;
      messageInput.style.width = '330px';
      this.messageBody.appendChild(messageBodyText);
      this.messageBody.appendChild(messageInput);
      this.confirmBtn.innerHTML = message.confirmBtnText;
      this.confirmBtn.style.padding = '12px 40px';
      this.confirmBtn.style.color = 'var(--second-color)';
      this.cancelBtn.innerHTML = message.cancelBtnText;
      this.cancelBtn.style.padding = '12px 40px';
      this.cancelBtn.style.color = 'var(--error-color)';
      this.messageBtnWrapper.appendChild(this.cancelBtn);
      this.messageBtnWrapper.appendChild(this.confirmBtn);
      this.messageContent.appendChild(this.messageHeader);
      this.messageContent.appendChild(this.messageBody);
      this.messageContent.appendChild(this.messageBtnWrapper);
      this.messageWrapper.appendChild(this.messageContent);
      document.body.appendChild(this.messageWrapper);
      document.body.appendChild(this.layer);
      // 锁定滑轮
      document.body.style.overflow = 'hidden';
  }
}
export default MessageBox.getInstance();
