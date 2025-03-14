export default function MapLegend() {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded shadow-md p-3">
      <h3 className="font-medium text-sm mb-2">Legenda</h3>

      <div className="flex items-center mb-1.5">
        <div className="w-4 h-4 rounded-full bg-red-500 opacity-70 mr-2"></div>
        <span className="text-xs">Chuva Forte (&gt; 7.6 mm/h)</span>
      </div>

      <div className="flex items-center mb-1.5">
        <div className="w-4 h-4 rounded-full bg-orange-500 opacity-70 mr-2"></div>
        <span className="text-xs">Chuva Moderada (2.5 - 7.6 mm/h)</span>
      </div>

      <div className="flex items-center">
        <div className="w-4 h-4 rounded-full bg-green-500 opacity-70 mr-2"></div>
        <span className="text-xs">Chuva Fraca (&lt; 2.5 mm/h)</span>
      </div>
    </div>
  )
}

