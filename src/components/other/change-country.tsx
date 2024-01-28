import { AE, EG } from 'country-flag-icons/react/3x2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


export default function ChangeCountrySelect() {
  return (
    <div className="pr-4">
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="egypt">
            <div className='flex'>
              <EG className='mr-3' width={20} />Egypt
            </div>
          </SelectItem>
          <SelectItem value="uae">
            <div className='flex'>
              <AE className='mr-3' width={20} />UAE
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>);
}