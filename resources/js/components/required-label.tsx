import { Label } from "./ui/label"

export default function RequiredLabel({forLabel, transMessage, required}:{forLabel:string, transMessage:string, required :boolean}){
    return (
        <Label htmlFor={forLabel}>{transMessage}
          {required &&  <span className="text-sm text-red-600">*</span>}
        </Label>
    );
}