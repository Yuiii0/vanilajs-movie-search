// Store

export class Store {
  constructor(state) {
    this.state = {}; //객체야
    this.observers = {};
    //객체 for
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => {
          state[key];
        },
        //state에 set등록할때
        set: (val) => {
          //1. state값도 update해주고,
          state[key] = val;
          //2. observers가 실행할 콜백이 있다면, 배열순회하면서 observer callback수행
          if (Array.isArray(this.observers[key])) {
            this.observers[key].forEach((observercb) => observercb(val));
          }
        },
      });
    }
  }
  //해당 key 상태변경 구독하는 subscribe메소드
  subscribe(key, cb) {
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : (this.observers[key] = [cb]);
    //observers = {
    //   구독할상태이름: [실행할콜백1, 실행할콜백2]
    //   movies: [cb, cb, cb],
  }
}
