import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Strategy() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Index Price</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {['Nifty', 'Bank Nifty', 'Sensex', 'Midcap', 'Finnifty', 'PNL', 'Active/Deactive'].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2">
              <Button variant="outline" className="w-full">{item}</Button>
              <Input placeholder="Active" className="w-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['Movement Time', 'Movement Continuity', 'Amount'].map((item) => (
          <div key={item} className="flex flex-col items-center gap-2">
            <Button variant="outline" className="w-full">{item}</Button>
            <Input placeholder="Active" className="w-full" defaultValue={item === 'Amount' ? '20000' : item === 'Movement Continuity' ? '1500' : '100'} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-yellow-300">Spike in Index</Button>
          <Input placeholder="Active" className="w-full" defaultValue="0.20%" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-yellow-300">Strike Price</Button>
          <div className="flex w-full gap-2">
            <Input placeholder="Active" className="flex-grow" defaultValue="4%" />
            <Button variant="destructive" className="px-3">+</Button>
            <Button variant="default" className="px-3">-</Button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" className="w-full bg-yellow-300">Target</Button>
          <Input placeholder="Active" className="w-full" defaultValue="50%" />
        </div>
      </div>

      {['SL', 'Profit Trail Active', 'Broker'].map((section, index) => (
        <div key={section} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[section, ['SL Trail', 'Lock', 'Account'][index], ['Re entry', 'Trail', 'Paper/Live'][index]].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2">
              <Button variant="outline" className="w-full bg-yellow-300">{item}</Button>
              <Input 
                placeholder="Active" 
                className="w-full" 
                defaultValue={
                  item === 'SL' ? '10%' : 
                  item === 'SL Trail' ? '4' : 
                  item === 'Re entry' ? '5' : 
                  item === 'Profit Trail Active' ? '5%' : 
                  item === 'Lock' ? '2%' : 
                  item === 'Trail' ? '1%' : ''
                } 
              />
            </div>
          ))}
        </div>
      ))}

      <Button className="w-full sm:w-auto">Save</Button>
    </div>
  )
}