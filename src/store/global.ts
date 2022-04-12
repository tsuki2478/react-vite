import { makeAutoObservable } from 'mobx';

class Global {
    secondsPassed = 0;

    increaseTimer = () => {
        this.secondsPassed += 1;
    };
}

export default makeAutoObservable(new Global());
