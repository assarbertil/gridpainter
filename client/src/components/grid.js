export function Grid(){

    return(<>
    <div className="grid grid-cols-[repeat(15,_1fr)] grid-rows-[repeat(15,_1fr)] h-full">
{[...Array(15).keys()].map(x => (
    
<div key={x} className="h-full w-full">
{[...Array(15).keys()].map(y => (
    
    <div key={y} onClick={() => console.log(x, y)} className="border border-sky-300 h-full" ></div>
    
    ))}
</div>
))}



    </div>
    </>)
}