


function readLists(filename:string): [number[], number[]] {
    let list1: number[] = [];
    let list2: number[] = [];

    Deno.readTextFileSync(filename).split('\n')
       .map(pair => {
            const [a,b] = pair.split('  ');
            list1.push(parseInt(a));
            list2.push(parseInt(b));
        });

    return [list1, list2];
}

function sortLists(list1: number[], list2:number[]): [number[], number[]] {
    const sortedList1 = [...list1]
        .sort((a,b) => a-b)
        .filter(value => !Number.isNaN(value));
    const sortedList2 = [...list2]
        .sort((a,b) => a-b)
        .filter(value => !Number.isNaN(value));

    return [sortedList1, sortedList2];
}

function findSimilarity(list1: number[], list2:number[]): number {
    let score: number = 0;

    for (let i=0;i<list1.length;i++) {
        let num = list1[i];
        for (let j=0;j<list2.length;j++) {
            if (num == list2[j]) {
                score+=num;
            }
        }
    }
    return score;
}



function findDistance(sortedList1: number[], sortedList2:number[]): number {
    let result: number[] = [];
    for (let i=0;i<sortedList1.length;i++) {
        result.push(Math.abs(sortedList1[i]-sortedList2[i]));
    }
    const sum = result.reduce((acc, curr) => acc + curr, 0);
    return sum;
}


let filename = Deno.args[0];
console.log(findDistance(...sortLists(...readLists(filename)))); 
console.log(findSimilarity(...readLists(filename)));



