// Sistema de toast simple 
export const toast = {
  success: (message) => {
    alert(`${message}`);
    console.log('SUCCESS:', message);
  },
  error: (message) => {
    alert(`${message}`);
    console.error('ERROR:', message);
  },
  info: (message) => {
    alert(`${message}`);
    console.log('INFO:', message);
  },
  warning: (message) => {
    alert(`${message}`);
    console.warn('WARNING:', message);
  }
};

