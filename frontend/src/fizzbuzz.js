const fizzbuzz = (from, to) => {
    for (let i = from; i<=to;i++){
        const isFizz = !(i % 3);
        const isBuzz = !(i % 5);

        if(!isFizz && !isBuzz) {
            console.log(i);
            continue
        }
        let out = '';
        if(isFizz) out += 'fizz'
        if(isBuzz) out += 'buzz'
        console.log(out)
        
    }
}

const doSomething = () => {
    
}