import AnchorTemporaryDrawer from './Drawer';

export default function Header() {
  return (
    <div className="flex justify-between p-[10px]">
      <AnchorTemporaryDrawer></AnchorTemporaryDrawer>
      <div className=""> userName</div>
    </div>
  );
}
