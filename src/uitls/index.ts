// 工具类函数
import moment from 'moment';

// 格式化时间
export const formatDateTime = (time: string) => {
  if (time == '') return '-';
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
};
