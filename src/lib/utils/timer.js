/**
 비동기적으로 콜백 함수를 실행하기 위해 태스크 큐를 비우고 다음 태스크 큐에 콜백 함수를 넣습니다.
 @param {Function} callback 실행할 콜백 함수
 */
export const forceNextTaskQueue = (callback) => setTimeout(callback, 0);
