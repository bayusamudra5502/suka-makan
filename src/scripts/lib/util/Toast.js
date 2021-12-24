export default class ToastUtil {
  static toastBuilder({ ToastConstructor, message, type }) {
    const newToast = new ToastConstructor();
    newToast.setMessage(message);

    switch (type) {
      case 'success':
        newToast.setAsSuccess();
        break;
      default:
        newToast.setAsError();
        break;
    }

    return newToast;
  }
}
