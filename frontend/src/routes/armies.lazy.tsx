import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { IArmy } from '../types/dto'
import ArmyComponent from '../components/armies/ArmyDisplay'

const loadArmies = async () : Promise<IArmy[]> => {
    const response = await fetch("/api/armies")
    const armies = await response.json()
    return armies
}

const ArmyList = () => {
    const {data, isError, isLoading} = useQuery({queryKey:["armies"], queryFn: loadArmies});
    if (isLoading) return "..."
    if (isError) return " Uahh!"
    if (data) return <>{data.map((army)=>{
        return <ArmyComponent army = {army}/>
    })}</>
}

const RouteComponent = () => {
    return <div><h3>List of all Armies</h3>
    <ArmyList />
    </div>
  }

export const Route = createLazyFileRoute('/armies')({
  component: RouteComponent,
})

