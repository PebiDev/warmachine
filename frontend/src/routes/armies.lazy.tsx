import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { IArmy } from '../types/dto'

const loadArmies = async () : Promise<IArmy[]> => {
    const response = await fetch("/api/armies")
    const armies = await response.json()
    return armies
}

const ArmyList = () => {
    const {data, isError, isLoading} = useQuery({queryKey:["armies"], queryFn: loadArmies});
    if (isLoading) return "..."
    if (isError) return " Uahh!"
    if (data) return <>{data.map((army, index)=>{
        return <div key={`${army.id}`}>
            <h4>{army.name}  {army.leader && `led by ${army.leader.name}`}</h4>
            
            <h5>Euipment: {army.equipmentFactor}</h5>
            <br></br>
            </div>
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

