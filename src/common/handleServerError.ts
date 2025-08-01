import { toast } from 'react-toastify';

export function handleServerError(response: { status: string; msg?: string | string[] }) {
  if (response.status !== 'error') return;

  const { msg } = response;

  if (!msg) {
    toast.error('خطایی رخ داده است.');
  } else if (typeof msg === 'string') {
    toast.error(msg);
  } else if (Array.isArray(msg)) {
    const combinedMsg = msg.join('، ');
    toast.error(combinedMsg);
  } else {
    toast.error('خطایی رخ داده است.');
  }
}