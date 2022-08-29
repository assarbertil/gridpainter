export function Grid({ color, onClick, border = true }) {
  return (
    <div className="grid grid-cols-[repeat(15,_1fr)] grid-rows-[repeat(15,_1fr)] h-full">
      {[...Array(15).keys()].map((x) => (
        <div key={x} className="w-full h-full">
          {[...Array(15).keys()].map((y) => (
            <div
              key={y}
              onClick={() => onClick(x, y)}
              className={`h-full ${border ? "border border-sky-300" : ""}`}
              style={{ backgroundColor: color[y][x] }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}
