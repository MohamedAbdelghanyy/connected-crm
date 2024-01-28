import { Checkbox } from '@/components/ui/checkbox';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';

export default function OrganizationTreeSelect({ units, updateSelection }: any) {

  let nodeID = 1;

  function generateTreeItem(unit: any) {
    if (unit.subUnits) {
      return (
        <TreeItem onClick={() => { updateSelection(unit) }} key={unit.id} nodeId={String(nodeID++)} label={(
          <div className="flex items-center space-x-2 pt-1 pb-1">
            <Checkbox id={unit.id} aria-label={unit.name} />
            <label
              htmlFor={unit.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {unit.name}
            </label>
          </div>
        )}>
          {unit.subUnits.map((unit: any) => {
            return generateTreeItem(unit);
          })}
        </TreeItem>
      );
    } else {
      return (
        <TreeItem onClick={() => { updateSelection(unit) }} key={unit.id} nodeId={String(nodeID++)} label={(
          <div className="flex items-center space-x-2 pt-1 pb-1">
            <Checkbox id={unit.id} aria-label={unit.name} />
            <label
              htmlFor={unit.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {unit.name}
            </label>
          </div>
        )} />
      );
    }
  }

  return (
    <div style={{ backgroundColor: "#1c1c1c", padding: "30px", borderRadius: "10px" }}>
      <TreeView
        aria-label="organization-tree"
        defaultCollapseIcon={<MinusCircleIcon />}
        defaultExpandIcon={<PlusCircleIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {
          units.map((unit: any) => {
            return generateTreeItem(unit);
          })
        }
      </TreeView>
    </div>
  );
}