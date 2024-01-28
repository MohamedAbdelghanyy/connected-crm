import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import AddRootUnit from '../../forms/add-root-unit';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '../../ui/context-menu';

export default function OrganizationTree({ units, updateSelection }: any) {

  let nodeID = 1;

  function generateTreeItem(unit: any) {
    if (unit.subUnits) {
      return (
        <TreeItem onClick={() => { updateSelection(unit) }} key={unit.id} nodeId={String(nodeID++)} label={(
          <ContextMenu>
            <ContextMenuTrigger>
              {unit.name}
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem>Add sub-unit</ContextMenuItem>
              <ContextMenuItem>Move all users</ContextMenuItem>
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )}>
          {unit.subUnits.map((unit: any) => {
            return generateTreeItem(unit);
          })}
        </TreeItem>
      );
    } else {
      return (
        <TreeItem onClick={() => { updateSelection(unit) }} key={unit.id} nodeId={String(nodeID++)} label={(
          <ContextMenu>
            <ContextMenuTrigger>
              {unit.name}
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem>Add sub-unit</ContextMenuItem>
              <ContextMenuItem>Move all users</ContextMenuItem>
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        )} />
      );
    }
  }

  return (
    <div style={{ backgroundColor: "#1c1c1c", padding: "30px", borderRadius: "10px" }}>
      <AddRootUnit />
      <h1>Organization Tree</h1>
      <div style={{ marginTop: "20px" }}>
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
    </div>
  );
}