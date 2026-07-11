import { ChevronRight, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

import type { ApiNavigationItem } from "@/lib/api";
import {
  useCreateNavigationItem,
  useDeleteNavigationItem,
  useNavigation,
  useUpdateNavigationItem,
} from "@/lib/queries";
import { Field, inputCls } from "@/components/admin/shared";

type Location = "header" | "footer";

export function NavigationPanel() {
  const [location, setLocation] = useState<Location>("header");
  const { data: items = [], isLoading } = useNavigation(location);
  const createMut = useCreateNavigationItem();
  const updateMut = useUpdateNavigationItem();
  const deleteMut = useDeleteNavigationItem();

  const topItems = items.filter((i) => !i.parent).sort((a, b) => a.sort_order - b.sort_order);
  const childrenOf = (id: string) =>
    items.filter((i) => i.parent === id).sort((a, b) => a.sort_order - b.sort_order);

  const addTopItem = () =>
    createMut.mutate({
      location,
      label: "New Link",
      url: location === "header" ? "/" : "",
      group: location === "footer" ? "Company" : undefined,
      sort_order: topItems.length + 1,
    });

  const addChild = (parentId: string) =>
    createMut.mutate({
      location,
      label: "New Sub Link",
      url: "/",
      parent: parentId,
      sort_order: childrenOf(parentId).length + 1,
    });

  return (
    <section className="rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 p-5">
        <div>
          <h2 className="text-xl font-black">Navigation Manager</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Manage header menu items (with dropdowns) and footer link columns. Product categories
            are shown automatically from the Products &amp; Categories modules.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-neutral-100 p-1">
          {(["header", "footer"] as Location[]).map((loc) => (
            <button
              key={loc}
              onClick={() => setLocation(loc)}
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                location === loc ? "bg-[var(--brand-green)] text-white" : "text-neutral-600"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-sm text-neutral-400">Loading navigation…</div>
      ) : (
        <div className="space-y-4 p-5">
          <button
            onClick={addTopItem}
            disabled={createMut.isPending}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-4 py-2.5 text-sm font-black text-neutral-700 hover:border-[var(--brand-green)] disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> Add {location === "header" ? "Menu Item" : "Footer Link"}
          </button>

          {topItems.length === 0 && (
            <div className="rounded-md border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-400">
              No {location} navigation items yet.
            </div>
          )}

          {topItems.map((item) => (
            <NavItemCard
              key={item.id}
              item={item}
              location={location}
              onUpdate={(body) => updateMut.mutate({ id: item.id, body })}
              onDelete={() => deleteMut.mutate(item.id)}
              deleting={deleteMut.isPending}
            >
              {location === "header" && (
                <div className="mt-3 space-y-2 border-t border-neutral-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wide text-neutral-400">
                      Dropdown Items
                    </span>
                    <button
                      onClick={() => addChild(item.id)}
                      className="inline-flex items-center gap-1 text-xs font-black text-[var(--brand-green)] hover:underline"
                    >
                      <Plus className="h-3 w-3" /> Add
                    </button>
                  </div>
                  {childrenOf(item.id).map((child) => (
                    <NavItemRow
                      key={child.id}
                      item={child}
                      onUpdate={(body) => updateMut.mutate({ id: child.id, body })}
                      onDelete={() => deleteMut.mutate(child.id)}
                    />
                  ))}
                </div>
              )}
            </NavItemCard>
          ))}
        </div>
      )}
    </section>
  );
}

function NavItemCard({
  item,
  location,
  onUpdate,
  onDelete,
  deleting,
  children,
}: {
  item: ApiNavigationItem;
  location: Location;
  onUpdate: (body: Partial<ApiNavigationItem>) => void;
  onDelete: () => void;
  deleting: boolean;
  children?: React.ReactNode;
}) {
  const [label, setLabel] = useState(item.label);
  const [url, setUrl] = useState(item.url);
  const [group, setGroup] = useState(item.group);
  const [sortOrder, setSortOrder] = useState(item.sort_order);
  const dirty =
    label !== item.label ||
    url !== item.url ||
    group !== item.group ||
    sortOrder !== item.sort_order;

  return (
    <div className="rounded-md border border-neutral-200 p-4">
      <div
        className={`grid gap-3 ${location === "footer" ? "sm:grid-cols-[1fr_1fr_1fr_auto_auto]" : "sm:grid-cols-[1fr_1fr_auto_auto]"}`}
      >
        <Field label="Label">
          <input value={label} onChange={(e) => setLabel(e.target.value)} className={inputCls} />
        </Field>
        <Field label="URL">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="/about"
            className={inputCls}
          />
        </Field>
        {location === "footer" && (
          <Field label="Column Group">
            <input
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="Company"
              className={inputCls}
            />
          </Field>
        )}
        <Field label="Sort Order">
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className={`w-20 ${inputCls}`}
          />
        </Field>
        <div className="flex items-end gap-2">
          <button
            onClick={() => onUpdate({ label, url, group, sort_order: sortOrder })}
            disabled={!dirty}
            className="flex h-9 items-center gap-1.5 rounded-md bg-[var(--brand-green)] px-3 text-xs font-black text-white disabled:opacity-40"
          >
            <Save className="h-3.5 w-3.5" /> Save
          </button>
          <button
            onClick={onDelete}
            disabled={deleting}
            className="flex h-9 w-9 items-center justify-center rounded-md text-neutral-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

function NavItemRow({
  item,
  onUpdate,
  onDelete,
}: {
  item: ApiNavigationItem;
  onUpdate: (body: Partial<ApiNavigationItem>) => void;
  onDelete: () => void;
}) {
  const [label, setLabel] = useState(item.label);
  const [url, setUrl] = useState(item.url);
  const dirty = label !== item.label || url !== item.url;

  return (
    <div className="flex items-center gap-2 rounded-md bg-neutral-50 p-2 pl-4">
      <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-neutral-300" />
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className={`flex-1 ${inputCls} bg-white`}
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={`flex-1 ${inputCls} bg-white`}
      />
      <button
        onClick={() => onUpdate({ label, url })}
        disabled={!dirty}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-neutral-400 hover:bg-green-50 hover:text-[var(--brand-green)] disabled:opacity-30"
      >
        <Save className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={onDelete}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-neutral-400 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
