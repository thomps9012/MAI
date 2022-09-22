export default function NoDuplicates({array}: any){
    return array.reduce(
        (prev_val: any, current_val: any) => {
            if (!prev_val.includes(current_val)){
                return [...prev_val, current_val];
            }
            return prev_val;
        },
        []
    )
}