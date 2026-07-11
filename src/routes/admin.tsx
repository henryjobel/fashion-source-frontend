import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  Boxes,
  Building2,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  PackagePlus,
  Plus,
  Save,
  Search,
  Settings,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { NavigationPanel } from "@/components/admin/NavigationPanel";
import { Toaster } from "@/components/ui/sonner";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import {
  apiPageToCms,
  cmsToApiPayload,
  defaultCmsPages,
  type CmsPage,
  type CmsSection,
} from "@/lib/cms";
import {
  auth,
  type ApiCategory,
  type ApiInquiry,
  type ApiProduct,
  type ApiSupplier,
} from "@/lib/api";
import {
  useAdminMe,
  useApiPages,
  useCategories,
  useCreateCategory,
  useCreateProduct,
  useDeleteCategory,
  useDeleteMedia,
  useDeletePage,
  useDeleteProduct,
  useInquiries,
  useLogin,
  useMedia,
  useProducts,
  useSuppliers,
  useUpdateCategory,
  useUpdateInquiryStatus,
  useUpdateProduct,
  useUpdateSupplierStatus,
  useUploadMedia,
  useUpsertPage,
} from "@/lib/queries";

// ── Types ──────────────────────────────────────────────────────────────────────
type Tab =
  | "overview"
  | "products"
  | "categories"
  | "pages"
  | "media"
  | "navigation"
  | "inquiries"
  | "suppliers"
  | "settings";

// ── Route ──────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard - Fashion Source BD" },
      { name: "description", content: "CMS dashboard for Fashion Source BD." },
    ],
  }),
  component: AdminDashboard,
});

// ── Login ──────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const login = useLogin();
  const [email, setEmail] = useState("admin@fashionsourcebd.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login.mutateAsync({ email, password });
      onLogin();
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb] px-4">
      <div className="w-full max-w-md rounded-md border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--brand-blue)] text-lg font-black text-white">
            F
          </div>
          <div>
            <div className="font-black leading-tight">Fashion Source BD</div>
            <div className="text-xs font-semibold text-neutral-500">Admin Login</div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-black text-neutral-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-[var(--brand-green)]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-black text-neutral-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-[var(--brand-green)]"
            />
          </label>
          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
          <button
            disabled={login.isPending}
            className="w-full rounded-md bg-[var(--brand-green)] py-3 text-sm font-black text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {login.isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-neutral-400">
          Default: admin@fashionsourcebd.com / admin12345
        </p>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [saved, setSaved] = useState(false);
  const { isError: authError } = useAdminMe();

  useEffect(() => {
    setLoggedIn(auth.isLoggedIn());
  }, []);
  useEffect(() => {
    if (authError) {
      auth.clearToken();
      setLoggedIn(false);
    }
  }, [authError]);

  if (loggedIn === null)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb]">
        <div className="text-sm font-semibold text-neutral-400">Loading…</div>
      </div>
    );
  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const savePulse = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-neutral-900">
      <Toaster position="top-right" richColors />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-neutral-200 bg-white lg:block">
        <Sidebar
          tab={tab}
          setTab={setTab}
          onLogout={() => {
            auth.clearToken();
            setLoggedIn(false);
          }}
        />
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 lg:px-8">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[var(--brand-green)]">
                CMS Dashboard
              </div>
              <h1 className="text-xl font-black">{navItems.find((i) => i.id === tab)?.label}</h1>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <span className="hidden items-center gap-2 rounded-full bg-[var(--brand-green)]/10 px-3 py-1.5 text-xs font-black text-[var(--brand-green)] sm:inline-flex">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Saved
                </span>
              )}
              <button className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white">
                <Bell className="h-4 w-4" />
              </button>
              <Link
                to="/"
                className="hidden rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-black text-neutral-700 hover:text-[var(--brand-green)] sm:inline-flex"
              >
                View Site
              </Link>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-black ${tab === id ? "bg-[var(--brand-green)] text-white" : "bg-neutral-100 text-neutral-600"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8">
          {tab === "overview" && <Overview />}
          {tab === "products" && <ProductsPanel savePulse={savePulse} />}
          {tab === "categories" && <CategoriesPanel savePulse={savePulse} />}
          {tab === "pages" && <PagesPanel savePulse={savePulse} />}
          {tab === "media" && <MediaPanel />}
          {tab === "navigation" && <NavigationPanel />}
          {tab === "inquiries" && <InquiriesPanel />}
          {tab === "suppliers" && <SuppliersPanel />}
          {tab === "settings" && <SettingsPanel savePulse={savePulse} />}
        </main>
      </div>
    </div>
  );
}

// ── Nav ────────────────────────────────────────────────────────────────────────
const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Boxes },
  { id: "categories", label: "Categories", icon: PackagePlus },
  { id: "pages", label: "Pages CMS", icon: FileText },
  { id: "media", label: "Media", icon: Image },
  { id: "navigation", label: "Navigation", icon: Menu },
  { id: "inquiries", label: "Inquiries", icon: Inbox },
  { id: "suppliers", label: "Suppliers", icon: Building2 },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({
  tab,
  setTab,
  onLogout,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-200 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--brand-blue)] text-lg font-black text-white">
            F
          </div>
          <div>
            <div className="font-black leading-tight">Fashion Source BD</div>
            <div className="text-xs font-semibold text-neutral-500">Admin Control Panel</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-black transition ${tab === id ? "bg-[var(--brand-green)] text-white" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950"}`}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4" /> {label}
            </span>
            <ChevronRight className="h-4 w-4 opacity-50" />
          </button>
        ))}
      </nav>
      <div className="border-t border-neutral-200 p-4 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-black text-neutral-600 hover:bg-neutral-50"
        >
          <Globe2 className="h-4 w-4" /> View Site
        </Link>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-black text-neutral-600 hover:bg-neutral-50"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}

// ── Overview ───────────────────────────────────────────────────────────────────
type ActivityItem = { id: string; label: string; detail: string; date: string; kind: string };

type CategoryGroup = ApiCategory & { children: ApiCategory[] };

function buildCategoryGroups(categories: ApiCategory[]): CategoryGroup[] {
  const parents = categories
    .filter((category) => !category.parent)
    .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title));
  const childrenFor = (parentId: string) =>
    categories
      .filter((category) => category.parent === parentId)
      .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title));

  const grouped = parents.map((parent) => ({ ...parent, children: childrenFor(parent.id) }));
  const attachedIds = new Set(grouped.flatMap((group) => [group.id, ...group.children.map((c) => c.id)]));
  const loose = categories
    .filter((category) => !attachedIds.has(category.id))
    .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title));

  return loose.length > 0
    ? [...grouped, ...loose.map((category) => ({ ...category, children: [] }))]
    : grouped;
}

function CategorySelect({
  value,
  categories,
  groups,
  onChange,
}: {
  value: string;
  categories: ApiCategory[];
  groups?: CategoryGroup[];
  onChange: (slug: string) => void;
}) {
  const categoryGroups = groups ?? buildCategoryGroups(categories);
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
      {categoryGroups.map((group) =>
        group.children.length > 0 ? (
          <optgroup key={group.id} label={group.title}>
            <option value={group.slug}>{group.title} (main category)</option>
            {group.children.map((child) => (
              <option key={child.id} value={child.slug}>
                {child.title}
              </option>
            ))}
          </optgroup>
        ) : (
          <option key={group.id} value={group.slug}>
            {group.title}
          </option>
        ),
      )}
    </select>
  );
}

function Overview() {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: inquiries = [] } = useInquiries();
  const { data: suppliers = [] } = useSuppliers();
  const { data: media = [] } = useMedia();
  const { data: apiPages } = useApiPages();
  const openInquiries = inquiries.filter((i) => i.status === "open").length;
  const pageCount = apiPages && apiPages.length > 0 ? apiPages.length : defaultCmsPages.length;

  const activity: ActivityItem[] = useMemo(() => {
    const items: ActivityItem[] = [
      ...inquiries.map((i) => ({
        id: `inq-${i.id}`,
        label: "New inquiry",
        detail: i.subject || i.name || i.email || "Contact form",
        date: i.createdAt,
        kind: "Inquiry",
      })),
      ...suppliers.map((s) => ({
        id: `sup-${s.id}`,
        label: "New supplier application",
        detail: s.company_name,
        date: s.createdAt,
        kind: "Supplier",
      })),
      ...products.map((p) => ({
        id: `prod-${p.id}`,
        label: "Product updated",
        detail: p.name,
        date: p.updatedAt,
        kind: "Product",
      })),
    ];
    return items
      .filter((i) => i.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [inquiries, suppliers, products]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Products" value={products.length} icon={Boxes} />
        <Metric label="Categories" value={categories.length} icon={PackagePlus} />
        <Metric label="Editable Pages" value={pageCount} icon={FileText} />
        <Metric label="Open Inquiries" value={openInquiries} icon={Inbox} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Supplier Applications" value={suppliers.length} icon={Building2} />
        <Metric label="Media Files" value={media.length} icon={Image} />
        <Metric label="All Inquiries" value={inquiries.length} icon={Inbox} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-md border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-black">Recent Activity</h2>
            <BarChart3 className="h-5 w-5 text-[var(--brand-green)]" />
          </div>
          {activity.length === 0 ? (
            <div className="p-6 text-center text-sm text-neutral-400">No recent activity yet.</div>
          ) : (
            <div className="space-y-3">
              {activity.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-md bg-neutral-50 p-4">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black uppercase text-[var(--brand-green)] ring-1 ring-neutral-200">
                    {item.kind.slice(0, 3)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-bold text-neutral-700">
                      {item.label}: {item.detail}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {new Date(item.date).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className="rounded-md bg-[var(--brand-blue)] p-6 text-white">
          <Globe2 className="mb-5 h-8 w-8 text-[var(--brand-green)]" />
          <h2 className="text-2xl font-black">Backend connected.</h2>
          <p className="mt-3 text-sm leading-7 text-white/70">
            All data is live from MongoDB. Run{" "}
            <code className="rounded bg-white/20 px-1 font-mono text-xs">npm run db:init</code> in
            Backend to seed initial data.
          </p>
        </section>
      </div>
    </div>
  );
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

// ── Products Panel (split layout with full field editor) ───────────────────────
function ProductsPanel({ savePulse }: { savePulse: () => void }) {
  const { data: apiProducts = [], isLoading } = useProducts();
  const { data: apiCategories = [] } = useCategories();
  const [local, setLocal] = useState<ApiProduct[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [quickName, setQuickName] = useState("");
  const [quickCategory, setQuickCategory] = useState("");
  const [quickImageUrl, setQuickImageUrl] = useState("");
  const quickFileRef = useRef<HTMLInputElement>(null);

  const createMut = useCreateProduct();
  const updateMut = useUpdateProduct();
  const deleteMut = useDeleteProduct();
  const uploadMut = useUploadMedia();

  const categoryGroups = useMemo(() => buildCategoryGroups(apiCategories), [apiCategories]);
  const defaultCategorySlug =
    categoryGroups.find((group) => group.children.length > 0)?.children[0]?.slug ??
    apiCategories[0]?.slug ??
    "knit";

  useEffect(() => {
    if (apiProducts.length > 0 && local.length === 0) {
      setLocal(apiProducts);
      setSelectedId(apiProducts[0]?.id ?? null);
    }
  }, [apiProducts]);

  // Merge in any products that appeared via refetch (e.g. just created) without
  // clobbering in-progress edits to products already in `local`.
  useEffect(() => {
    setLocal((prev) => {
      if (prev.length === 0) return prev;
      const known = new Set(prev.map((p) => p.id));
      const added = apiProducts.filter((p) => !known.has(p.id));
      return added.length > 0 ? [...prev, ...added] : prev;
    });
  }, [apiProducts]);

  const selected = local.find((p) => p.id === selectedId);

  const patch = (id: string, updates: Partial<ApiProduct>) =>
    setLocal((items) => items.map((p) => (p.id === id ? { ...p, ...updates } : p)));

  const saveProduct = async (product: ApiProduct) => {
    try {
      await updateMut.mutateAsync({ id: product.id, body: product });
      savePulse();
      toast.success("Product saved");
    } catch (error) {
      toast.error(errorMessage(error, "Could not save product"));
    }
  };

  const addProduct = async () => {
    try {
      const result = await createMut.mutateAsync({
        name: "New Product",
        short_name: "New Product",
        description: "Write product description here.",
        image_url:
          "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&h=900&q=82",
        specs: ["Spec 1", "Spec 2", "Spec 3"],
        category_slug: defaultCategorySlug,
        status: "active",
        sort_order: local.length + 1,
      });
      setSelectedId(result.id);
      savePulse();
      toast.success("Product added");
    } catch (error) {
      toast.error(errorMessage(error, "Could not add product"));
    }
  };

  const createQuickProduct = async () => {
    const name = quickName.trim();
    if (!name) return;
    try {
      let imageUrl = quickImageUrl.trim();
      const file = quickFileRef.current?.files?.[0];
      if (file) {
        const uploaded = await uploadMut.mutateAsync({ file, altText: name });
        imageUrl = uploaded.data.secure_url;
      }
      const categorySlug = quickCategory || defaultCategorySlug;
      const category = apiCategories.find((item) => item.slug === categorySlug);
      const result = await createMut.mutateAsync({
        name,
        short_name: name,
        description: "Product details coming soon.",
        image_url: imageUrl,
        specs: [],
        category_slug: categorySlug,
        status: "active",
        sort_order: local.length + 1,
      });
      const nextProduct: ApiProduct = {
        id: result.id,
        slug: result.slug,
        name,
        short_name: name,
        description: "Product details coming soon.",
        image_url: imageUrl,
        specs: [],
        status: "active",
        sort_order: local.length + 1,
        category_id: category?.id ?? null,
        category_slug: categorySlug,
        category_title: category?.title ?? categorySlug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLocal((items) => [nextProduct, ...items]);
      setSelectedId(result.id);
      setQuickName("");
      setQuickImageUrl("");
      if (quickFileRef.current) quickFileRef.current.value = "";
      savePulse();
      toast.success(`"${name}" uploaded`);
    } catch (error) {
      toast.error(errorMessage(error, "Could not upload product"));
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await deleteMut.mutateAsync(id);
      setLocal((items) => {
        const next = items.filter((p) => p.id !== id);
        setSelectedId(next[0]?.id ?? null);
        return next;
      });
      toast.success("Product deleted");
    } catch (error) {
      toast.error(errorMessage(error, "Could not delete product"));
    }
  };

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return local;
    return local.filter(
      (p) => p.name.toLowerCase().includes(needle) || p.short_name.toLowerCase().includes(needle),
    );
  }, [local, query]);

  return (
    <section className="rounded-md border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 p-5">
        <div>
          <h2 className="text-xl font-black">Products</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Upload a product fast, then fine-tune image, category, notes and status.
          </p>
        </div>
        <button
          onClick={addProduct}
          disabled={createMut.isPending}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-green)] px-4 py-2.5 text-sm font-black text-white disabled:opacity-60"
        >
          <Plus className="h-4 w-4" /> {createMut.isPending ? "Adding…" : "Add Product"}
        </button>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-sm text-neutral-400">Loading products…</div>
      ) : (
        <div>
          <div className="border-b border-neutral-200 bg-neutral-50 p-5">
            <div className="grid gap-3 xl:grid-cols-[1.1fr_1fr_1fr_1fr_auto] xl:items-end">
              <Field label="Product Name">
                <input
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  placeholder="Men's T-Shirt / Boxer / Brief"
                  className={inputCls}
                />
              </Field>
              <Field label="Category / Subcategory">
                <CategorySelect
                  value={quickCategory || defaultCategorySlug}
                  categories={apiCategories}
                  onChange={setQuickCategory}
                />
              </Field>
              <Field label="Image URL">
                <input
                  value={quickImageUrl}
                  onChange={(e) => setQuickImageUrl(e.target.value)}
                  placeholder="Paste image URL"
                  className={inputCls}
                />
              </Field>
              <Field label="Or Upload Image">
                <input
                  ref={quickFileRef}
                  type="file"
                  accept="image/*"
                  className={`${inputCls} bg-white`}
                />
              </Field>
              <button
                onClick={createQuickProduct}
                disabled={!quickName.trim() || createMut.isPending || uploadMut.isPending}
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[var(--brand-green)] px-4 py-2 text-sm font-black text-white disabled:opacity-50"
              >
                <Upload className="h-4 w-4" />
                {createMut.isPending || uploadMut.isPending ? "Uploading..." : "Upload Product"}
              </button>
            </div>
          </div>

          <div className="grid min-h-[680px] lg:grid-cols-[300px_1fr]">
          {/* Left: product list */}
          <div className="border-b border-neutral-200 lg:border-b-0 lg:border-r">
            <div className="border-b border-neutral-100 p-3">
              <div className="flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3">
                <Search className="h-4 w-4 text-neutral-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="h-9 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`flex w-full items-center gap-3 border-b border-neutral-100 px-4 py-3 text-left transition last:border-0 ${selectedId === p.id ? "bg-[var(--brand-green)]/5 border-l-2 border-l-[var(--brand-green)]" : "hover:bg-neutral-50"}`}
                >
                  {p.image_url ? (
                    <img
                      src={p.image_url}
                      alt=""
                      className="h-10 w-10 flex-shrink-0 rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 flex-shrink-0 rounded-md bg-neutral-100" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-black text-neutral-800">{p.name}</div>
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-xs text-neutral-500">
                        {p.category_title || p.category_slug}
                      </span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] font-black uppercase ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="p-6 text-center text-sm text-neutral-400">No products found.</div>
              )}
            </div>
          </div>

          {/* Right: edit form */}
          {selected ? (
            <ProductEditForm
              product={selected}
              categories={apiCategories}
              onChange={(updates) => patch(selected.id, updates)}
              onSave={() => saveProduct(selected)}
              onDelete={() => deleteProduct(selected.id)}
              saving={updateMut.isPending}
              deleting={deleteMut.isPending}
              categoryGroups={categoryGroups}
            />
          ) : (
            <div className="flex items-center justify-center p-12 text-sm text-neutral-400">
              Select a product from the list to edit.
            </div>
          )}
          </div>
        </div>
      )}
    </section>
  );
}

function ProductEditForm({
  product,
  categories,
  categoryGroups,
  onChange,
  onSave,
  onDelete,
  saving,
  deleting,
}: {
  product: ApiProduct;
  categories: ApiCategory[];
  categoryGroups: ReturnType<typeof buildCategoryGroups>;
  onChange: (updates: Partial<ApiProduct>) => void;
  onSave: () => void;
  onDelete: () => void;
  saving: boolean;
  deleting: boolean;
}) {
  const [newSpec, setNewSpec] = useState("");
  const uploadMut = useUploadMedia();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadMut.mutateAsync({ file, altText: product.name });
    onChange({ image_url: result.data.secure_url });
    if (fileRef.current) fileRef.current.value = "";
  };

  const addSpec = () => {
    if (!newSpec.trim()) return;
    onChange({ specs: [...(product.specs ?? []), newSpec.trim()] });
    setNewSpec("");
  };

  const removeSpec = (i: number) =>
    onChange({ specs: product.specs.filter((_, idx) => idx !== i) });

  const updateSpec = (i: number, val: string) =>
    onChange({ specs: product.specs.map((s, idx) => (idx === i ? val : s)) });

  const changeCategory = (slug: string) => {
    const category = categories.find((item) => item.slug === slug);
    onChange({
      category_slug: slug,
      category_id: category?.id ?? product.category_id,
      category_title: category?.title ?? product.category_title,
    });
  };

  return (
    <div className="overflow-y-auto p-6">
      {/* Image preview + URL */}
      <div className="mb-6 grid gap-4 sm:grid-cols-[160px_1fr] sm:items-start">
        <div className="aspect-square w-full overflow-hidden rounded-md bg-neutral-100">
          {product.image_url ? (
            <img src={product.image_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-neutral-400">
              No image
            </div>
          )}
        </div>
        <div className="space-y-3">
          <Field label="Product Image">
            <div className="flex items-center gap-2">
              <input
                value={product.image_url}
                onChange={(e) => onChange({ image_url: e.target.value })}
                placeholder="https://… or upload a file"
                className={inputCls}
              />
              <label className="flex h-9 flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-md border border-neutral-200 px-3 text-xs font-black text-neutral-700 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]">
                <Upload className="h-3.5 w-3.5" />
                {uploadMut.isPending ? "Uploading…" : "Upload"}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploadMut.isPending}
                />
              </label>
            </div>
          </Field>
          <Field label="Slug (auto-generated, read-only)">
            <input
              value={product.slug}
              readOnly
              className={`${inputCls} bg-neutral-50 text-neutral-400`}
            />
          </Field>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Product Name *">
          <input
            value={product.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Short Name">
          <input
            value={product.short_name}
            onChange={(e) => onChange({ short_name: e.target.value })}
            className={inputCls}
          />
        </Field>
        <Field label="Category / Subcategory">
          <CategorySelect
            value={product.category_slug}
            categories={categories}
            groups={categoryGroups}
            onChange={changeCategory}
          />
        </Field>
        <Field label="Status">
          <select
            value={product.status}
            onChange={(e) => onChange({ status: e.target.value as ApiProduct["status"] })}
            className={inputCls}
          >
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </Field>
        <Field label="Sort Order">
          <input
            type="number"
            value={product.sort_order}
            onChange={(e) => onChange({ sort_order: Number(e.target.value) })}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Description">
          <textarea
            value={product.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={4}
            className={`${inputCls} resize-none`}
          />
        </Field>
      </div>

      {/* Specs editor */}
      <div className="mt-4">
        <label className="mb-2 block text-sm font-black text-neutral-700">
          Product Specs / Notes
        </label>
        <div className="space-y-2">
          {product.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={spec}
                onChange={(e) => updateSpec(i, e.target.value)}
                className={`flex-1 ${inputCls}`}
              />
              <button
                onClick={() => removeSpec(i)}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-neutral-400 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <input
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSpec())}
              placeholder="Add spec and press Enter…"
              className={`flex-1 ${inputCls}`}
            />
            <button
              onClick={addSpec}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
        <button
          onClick={onDelete}
          disabled={deleting}
          className="inline-flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-black text-red-600 hover:bg-red-50 disabled:opacity-40"
        >
          <Trash2 className="h-4 w-4" /> {deleting ? "Deleting…" : "Delete"}
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-green)] px-5 py-2 text-sm font-black text-white disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Product"}
        </button>
      </div>
    </div>
  );
}

// ── Categories Panel ───────────────────────────────────────────────────────────
function CategoriesPanel({ savePulse }: { savePulse: () => void }) {
  const { data: apiCategories = [], isLoading } = useCategories();
  const [local, setLocal] = useState<ApiCategory[]>([]);
  const [changed, setChanged] = useState<Set<string>>(new Set());
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newParentId, setNewParentId] = useState("");

  const createMut = useCreateCategory();
  const updateMut = useUpdateCategory();
  const deleteMut = useDeleteCategory();
  const topCategories = local
    .filter((cat) => !cat.parent)
    .sort((a, b) => a.sort_order - b.sort_order || a.title.localeCompare(b.title));

  useEffect(() => {
    if (apiCategories.length > 0 && local.length === 0) setLocal(apiCategories);
  }, [apiCategories]);

  // Merge in any categories that appeared via refetch (e.g. just created) without
  // clobbering in-progress edits to categories already in `local`.
  useEffect(() => {
    setLocal((prev) => {
      if (prev.length === 0) return prev;
      const known = new Set(prev.map((c) => c.id));
      const added = apiCategories.filter((c) => !known.has(c.id));
      return added.length > 0 ? [...prev, ...added] : prev;
    });
  }, [apiCategories]);

  const patch = (id: string, updates: Partial<ApiCategory>) => {
    setLocal((items) => items.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    setChanged((s) => new Set([...s, id]));
  };

  const saveAll = async () => {
    for (const id of changed) {
      const cat = local.find((c) => c.id === id);
      if (cat) await updateMut.mutateAsync({ id, body: cat });
    }
    setChanged(new Set());
    savePulse();
  };

  const addCategory = async (parent: string | null = null) => {
    const parentTitle = parent ? local.find((cat) => cat.id === parent)?.title : "";
    const title = newCategoryName.trim();
    if (!title) return;
    await createMut.mutateAsync({
      title,
      intro: parent
        ? `${title} products under ${parentTitle || "this category"}.`
        : `${title} product category.`,
      description: parent
        ? `${title} product range for the product listing page.`
        : `${title} product category description.`,
      parent,
      status: "active",
      sort_order: parent
        ? local.filter((cat) => cat.parent === parent).length + 1
        : topCategories.length + 1,
    });
    setNewCategoryName("");
  };

  return (
    <section className="rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 p-5">
        <div>
          <h2 className="text-xl font-black">Categories</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Add main categories and subcategories. Product mega menu updates from this list.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-2">
          {changed.size > 0 && (
            <button
              onClick={saveAll}
              disabled={updateMut.isPending}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--brand-green)] px-4 py-2.5 text-sm font-black text-white disabled:opacity-60"
            >
              <Save className="h-4 w-4" />{" "}
              {updateMut.isPending
                ? "Saving…"
                : `Save ${changed.size} change${changed.size > 1 ? "s" : ""}`}
            </button>
          )}
          <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-neutral-400">
              Category Name
            </span>
            <input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCategory(newParentId || null)}
              placeholder={newParentId ? "Men's Knit & Lingerie" : "Knit"}
              className={`${inputCls} w-64 bg-white`}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-black uppercase tracking-wide text-neutral-400">
              Type
            </span>
          <select
            value={newParentId}
            onChange={(e) => setNewParentId(e.target.value)}
            className={`${inputCls} w-52 bg-white`}
          >
            <option value="">Main category</option>
            {topCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                Under {cat.title}
              </option>
            ))}
          </select>
          </label>
          <button
            onClick={() => addCategory(newParentId || null)}
            disabled={createMut.isPending || !newCategoryName.trim()}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm font-black text-neutral-700 hover:border-[var(--brand-green)] disabled:opacity-45"
          >
            <Plus className="h-4 w-4" />{" "}
            {createMut.isPending ? "Adding..." : newParentId ? "Add Subcategory" : "Add Category"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-10 text-center text-sm text-neutral-400">Loading categories…</div>
      ) : (
        <div className="grid gap-5 p-5 md:grid-cols-2">
          {local.map((cat) => (
            <div key={cat.id} className="rounded-md border border-neutral-200 p-5 space-y-3">
              {/* Title row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-neutral-400">
                    Title
                  </label>
                  <input
                    value={cat.title}
                    onChange={(e) => patch(cat.id, { title: e.target.value })}
                    className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-xl font-black outline-none transition focus:border-[var(--brand-green)]"
                  />
                </div>
                <button
                  onClick={async () => {
                    await deleteMut.mutateAsync(cat.id);
                    setLocal((items) => items.filter((c) => c.id !== cat.id));
                  }}
                  disabled={deleteMut.isPending}
                  className="mt-6 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-neutral-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              {/* Slug */}
              <div className="text-xs font-black uppercase tracking-wide text-neutral-400">
                slug: /{cat.slug}
                {cat.parent &&
                  (() => {
                    const parentTitle = local.find((c) => c.id === cat.parent)?.title;
                    return parentTitle ? (
                      <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 normal-case tracking-normal text-neutral-500">
                        Sub-category of {parentTitle}
                      </span>
                    ) : null;
                  })()}
              </div>
              {/* Parent Category (sub-category) */}
              <Field label="Parent Category (leave as “None” for a top-level category)">
                <select
                  value={cat.parent ?? ""}
                  onChange={(e) => patch(cat.id, { parent: e.target.value || null })}
                  className={inputCls}
                >
                  <option value="">None — top-level category</option>
                  {local
                    .filter((c) => c.id !== cat.id && !c.parent)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                </select>
              </Field>
              {/* Status + Sort Order */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Status">
                  <select
                    value={cat.status}
                    onChange={(e) =>
                      patch(cat.id, { status: e.target.value as ApiCategory["status"] })
                    }
                    className={inputCls}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </Field>
                <Field label="Sort Order">
                  <input
                    type="number"
                    value={cat.sort_order}
                    onChange={(e) => patch(cat.id, { sort_order: Number(e.target.value) })}
                    className={inputCls}
                  />
                </Field>
              </div>
              {/* Intro */}
              <Field label="Intro (short description)">
                <textarea
                  value={cat.intro}
                  onChange={(e) => patch(cat.id, { intro: e.target.value })}
                  rows={2}
                  className={`${inputCls} resize-none`}
                />
              </Field>
              {/* Description */}
              <Field label="Full Description">
                <textarea
                  value={cat.description}
                  onChange={(e) => patch(cat.id, { description: e.target.value })}
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>
          ))}
          {local.length === 0 && (
            <div className="col-span-2 rounded-md border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-400">
              No categories yet. Click "Add Category" to get started.
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// ── Pages Panel ────────────────────────────────────────────────────────────────
function PagesPanel({ savePulse }: { savePulse: () => void }) {
  const { data: apiPages } = useApiPages();
  const upsertMut = useUpsertPage();
  const deleteMut = useDeletePage();
  const [pages, setPages] = useState<CmsPage[]>(defaultCmsPages);
  const [apiPageIds, setApiPageIds] = useState<Record<string, string>>({});
  const [activePageSlug, setActivePageSlug] = useState(defaultCmsPages[0]?.slug ?? "/");

  useEffect(() => {
    if (apiPages && apiPages.length > 0) {
      setPages(apiPages.map(apiPageToCms));
      const ids: Record<string, string> = {};
      for (const p of apiPages) ids[p.slug] = p.id;
      setApiPageIds(ids);
      setActivePageSlug(apiPages[0].slug);
    }
  }, [apiPages]);

  const activePage = pages.find((p) => p.slug === activePageSlug) ?? pages[0];

  const updatePage = (slug: string, patch: Partial<CmsPage>) =>
    setPages((items) => items.map((p) => (p.slug === slug ? { ...p, ...patch } : p)));

  const updateSection = (pageSlug: string, sectionId: string, section: CmsSection) =>
    setPages((items) =>
      items.map((p) =>
        p.slug === pageSlug
          ? {
              ...p,
              updated: "Just now",
              sections: p.sections.map((s) => (s.id === sectionId ? section : s)),
            }
          : p,
      ),
    );

  const addField = (pageSlug: string, sectionId: string) => {
    const page = pages.find((p) => p.slug === pageSlug);
    const section = page?.sections.find((s) => s.id === sectionId);
    if (!section) return;
    updateSection(pageSlug, sectionId, {
      ...section,
      fields: [
        ...section.fields,
        {
          key: `custom-${section.fields.length + 1}`,
          label: `Custom Field ${section.fields.length + 1}`,
          value: "New editable content",
          type: "text",
        },
      ],
    });
  };

  const savePage = async (page: CmsPage) => {
    const payload = cmsToApiPayload(page);
    await upsertMut.mutateAsync({ id: apiPageIds[page.slug], body: payload });
    savePulse();
  };

  const deletePage = async (page: CmsPage) => {
    const id = apiPageIds[page.slug];
    if (!id) return;
    await deleteMut.mutateAsync(id);
    setPages((items) => {
      const next = items.filter((p) => p.slug !== page.slug);
      setActivePageSlug(next[0]?.slug ?? "/");
      return next;
    });
  };

  return (
    <section className="overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 p-5">
        <div>
          <h2 className="text-xl font-black">Pages CMS</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Edit every page section: hero, content, cards, forms, settings and charts.
          </p>
        </div>
        <button
          onClick={() => {
            setPages(defaultCmsPages);
            setActivePageSlug(defaultCmsPages[0]?.slug ?? "/");
          }}
          className="text-sm font-black text-neutral-500 hover:text-[var(--brand-green)]"
        >
          Reset to defaults
        </button>
      </div>
      <div className="grid min-h-[680px] lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-neutral-200 bg-neutral-50 p-4 lg:border-b-0 lg:border-r">
          <div className="space-y-2">
            {pages.map((page) => (
              <button
                key={page.slug}
                onClick={() => setActivePageSlug(page.slug)}
                className={`w-full rounded-md border px-4 py-3 text-left transition ${page.slug === activePage?.slug ? "border-[var(--brand-green)] bg-white shadow-sm" : "border-transparent hover:border-neutral-200 hover:bg-white"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-black text-neutral-900">{page.title}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-black uppercase ${page.status === "Published" ? "bg-[var(--brand-green)]/10 text-[var(--brand-green)]" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {page.status}
                  </span>
                </div>
                <div className="mt-1 text-xs font-semibold text-neutral-500">{page.slug}</div>
              </button>
            ))}
          </div>
        </aside>

        {activePage && (
          <div className="p-5">
            <div className="mb-6 rounded-md border border-neutral-200 bg-neutral-50 p-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <input
                    value={activePage.title}
                    onChange={(e) => updatePage(activePage.slug, { title: e.target.value })}
                    className="w-full rounded-md border border-transparent bg-transparent text-2xl font-black outline-none focus:border-[var(--brand-green)]"
                  />
                  <div className="mt-2 text-sm font-semibold text-neutral-500">
                    {activePage.slug} | Updated {activePage.updated}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={activePage.status}
                    onChange={(e) =>
                      updatePage(activePage.slug, {
                        status: e.target.value as CmsPage["status"],
                        updated: "Just now",
                      })
                    }
                    className={inputCls}
                  >
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                  <button
                    onClick={() => savePage(activePage)}
                    disabled={upsertMut.isPending}
                    className="flex items-center gap-2 rounded-md bg-[var(--brand-green)] px-4 py-2.5 text-sm font-black text-white disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" /> {upsertMut.isPending ? "Saving…" : "Save"}
                  </button>
                  {apiPageIds[activePage.slug] && (
                    <button
                      onClick={() =>
                        window.confirm(
                          `Delete the "${activePage.title}" page? This cannot be undone.`,
                        ) && deletePage(activePage)
                      }
                      disabled={deleteMut.isPending}
                      className="flex h-full items-center justify-center rounded-md border border-red-200 px-3 text-red-600 hover:bg-red-50 disabled:opacity-40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-5">
              {activePage.sections.map((section) => (
                <div key={section.id} className="rounded-md border border-neutral-200 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-100 px-5 py-4">
                    <div>
                      <div className="text-lg font-black">{section.label}</div>
                      <div className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-neutral-400">
                        {section.type} section | {section.id}
                      </div>
                    </div>
                    <button
                      onClick={() => addField(activePage.slug, section.id)}
                      className="inline-flex items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-xs font-black text-neutral-700 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Field
                    </button>
                  </div>
                  <div className="grid gap-4 p-5 md:grid-cols-2">
                    {section.fields.map((field) => {
                      const setFieldValue = (value: string) =>
                        updateSection(activePage.slug, section.id, {
                          ...section,
                          fields: section.fields.map((f) =>
                            f.key === field.key ? { ...f, value } : f,
                          ),
                        });
                      return (
                        <label
                          key={field.key}
                          className={
                            field.type === "textarea" || field.type === "image"
                              ? "block md:col-span-2"
                              : "block"
                          }
                        >
                          <span className="mb-1.5 block text-sm font-black text-neutral-700">
                            {field.label}
                          </span>
                          {field.type === "textarea" ? (
                            <textarea
                              value={field.value}
                              onChange={(e) => setFieldValue(e.target.value)}
                              className={`min-h-24 w-full ${inputCls} resize-none`}
                            />
                          ) : field.type === "image" ? (
                            <PageImageField value={field.value} onChange={setFieldValue} />
                          ) : (
                            <input
                              value={field.value}
                              onChange={(e) => setFieldValue(e.target.value)}
                              className={`w-full ${inputCls}`}
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Media Panel ────────────────────────────────────────────────────────────────
function MediaPanel() {
  const { data: mediaItems = [], isLoading } = useMedia();
  const uploadMut = useUploadMedia();
  const deleteMut = useDeleteMedia();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadMut.mutateAsync({ file, altText: file.name });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <section className="rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 p-5">
        <div>
          <h2 className="text-xl font-black">Media Library</h2>
          <p className="mt-1 text-sm text-neutral-500">
            Upload images to Cloudinary and use the URL in products or pages.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-[var(--brand-green)] px-4 py-2.5 text-sm font-black text-white">
          <Upload className="h-4 w-4" />
          {uploadMut.isPending ? "Uploading…" : "Upload Image"}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploadMut.isPending}
          />
        </label>
      </div>
      {isLoading ? (
        <div className="p-10 text-center text-sm text-neutral-400">Loading media…</div>
      ) : mediaItems.length === 0 ? (
        <div className="p-10 text-center text-sm text-neutral-400">No media uploaded yet.</div>
      ) : (
        <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {mediaItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-md border border-neutral-200"
            >
              <img
                src={item.secure_url || item.url}
                alt={item.alt_text}
                className="aspect-square w-full object-cover"
              />
              <button
                onClick={() =>
                  window.confirm("Delete this image? This cannot be undone.") &&
                  deleteMut.mutate(item.id)
                }
                disabled={deleteMut.isPending}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-neutral-500 opacity-0 shadow transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 disabled:opacity-40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <div className="p-3">
                <div className="truncate text-xs font-bold text-neutral-700">
                  {item.alt_text || item.public_id}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(item.secure_url || item.url)}
                  className="mt-1 text-[10px] font-black uppercase tracking-wide text-[var(--brand-green)] hover:underline"
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Inquiries Panel ────────────────────────────────────────────────────────────
function InquiriesPanel() {
  const { data: inquiries = [], isLoading } = useInquiries();
  const updateStatus = useUpdateInquiryStatus();
  const [expanded, setExpanded] = useState<string | null>(null);

  const statusBadge: Record<ApiInquiry["status"], string> = {
    open: "bg-green-100 text-green-700",
    review: "bg-yellow-100 text-yellow-700",
    closed: "bg-neutral-100 text-neutral-500",
    archived: "bg-neutral-100 text-neutral-400",
  };

  return (
    <section className="rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 p-5">
        <h2 className="text-xl font-black">Inquiries</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Contact form submissions from buyers, suppliers and partners. Click a row to expand.
        </p>
      </div>
      {isLoading ? (
        <div className="p-10 text-center text-sm text-neutral-400">Loading inquiries…</div>
      ) : inquiries.length === 0 ? (
        <div className="p-10 text-center text-sm text-neutral-400">
          No inquiries yet. They appear here when the contact form is submitted.
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {inquiries.map((inq) => (
            <div key={inq.id}>
              <button
                className="grid w-full gap-2 p-4 text-left transition hover:bg-neutral-50 sm:grid-cols-[0.5fr_0.8fr_1fr_auto_auto]"
                onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
              >
                <span
                  className={`inline-flex h-fit rounded-full px-2 py-1 text-[10px] font-black uppercase ${statusBadge[inq.status]}`}
                >
                  {inq.status}
                </span>
                <span className="font-black text-neutral-800">{inq.name || "—"}</span>
                <span className="truncate text-sm text-neutral-600">
                  {inq.subject || inq.message?.slice(0, 60) || "—"}
                </span>
                <span className="text-xs text-neutral-400">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs font-black capitalize text-neutral-500">{inq.type}</span>
              </button>
              {expanded === inq.id && (
                <div className="border-t border-neutral-100 bg-neutral-50 p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoRow label="Name" value={inq.name} />
                    <InfoRow label="Email" value={inq.email} />
                    <InfoRow label="Phone" value={inq.phone} />
                    <InfoRow label="Type" value={inq.type} />
                    <InfoRow label="Subject" value={inq.subject} />
                    <InfoRow label="Date" value={new Date(inq.createdAt).toLocaleString()} />
                    <div className="sm:col-span-2">
                      <div className="mb-1 text-xs font-black uppercase tracking-wide text-neutral-400">
                        Message
                      </div>
                      <div className="rounded-md border border-neutral-200 bg-white p-3 text-sm text-neutral-700 whitespace-pre-wrap">
                        {inq.message || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-xs font-black uppercase tracking-wide text-neutral-400">
                        Update Status
                      </div>
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          updateStatus.mutate({
                            id: inq.id,
                            status: e.target.value as ApiInquiry["status"],
                          })
                        }
                        className={inputCls}
                      >
                        <option value="open">Open</option>
                        <option value="review">In Review</option>
                        <option value="closed">Closed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Suppliers Panel ────────────────────────────────────────────────────────────
function SuppliersPanel() {
  const { data: suppliers = [], isLoading } = useSuppliers();
  const updateStatus = useUpdateSupplierStatus();
  const [expanded, setExpanded] = useState<string | null>(null);

  const statusBadge: Record<ApiSupplier["status"], string> = {
    new: "bg-blue-100 text-blue-700",
    review: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-600",
  };

  return (
    <section className="rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 p-5">
        <h2 className="text-xl font-black">Supplier Applications</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Factory applications from the Become Supplier form. Click a row to expand all details.
        </p>
      </div>
      {isLoading ? (
        <div className="p-10 text-center text-sm text-neutral-400">Loading suppliers…</div>
      ) : suppliers.length === 0 ? (
        <div className="p-10 text-center text-sm text-neutral-400">
          No supplier applications yet.
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {suppliers.map((sup) => (
            <div key={sup.id}>
              <button
                className="grid w-full gap-2 p-4 text-left transition hover:bg-neutral-50 sm:grid-cols-[0.5fr_1fr_0.8fr_0.6fr_auto]"
                onClick={() => setExpanded(expanded === sup.id ? null : sup.id)}
              >
                <span
                  className={`inline-flex h-fit rounded-full px-2 py-1 text-[10px] font-black uppercase ${statusBadge[sup.status]}`}
                >
                  {sup.status}
                </span>
                <span className="font-black text-neutral-800">{sup.company_name}</span>
                <span className="text-sm text-neutral-600">{sup.contact_person || "—"}</span>
                <span className="text-sm text-neutral-500">{sup.country || "—"}</span>
                <span className="text-xs text-neutral-400">
                  {new Date(sup.createdAt).toLocaleDateString()}
                </span>
              </button>
              {expanded === sup.id && (
                <div className="border-t border-neutral-100 bg-neutral-50 p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InfoRow label="Company" value={sup.company_name} />
                    <InfoRow label="Contact Person" value={sup.contact_person} />
                    <InfoRow label="Email" value={sup.email} />
                    <InfoRow label="Website" value={sup.website} />
                    <InfoRow label="Country" value={sup.country} />
                    <InfoRow label="Monthly Capacity" value={sup.monthly_capacity} />
                    <InfoRow
                      label="Date Applied"
                      value={new Date(sup.createdAt).toLocaleString()}
                    />
                    {sup.profile_url && <InfoRow label="Profile URL" value={sup.profile_url} />}
                    {sup.service_details && (
                      <div className="sm:col-span-2">
                        <div className="mb-1 text-xs font-black uppercase tracking-wide text-neutral-400">
                          Service Details
                        </div>
                        <div className="rounded-md border border-neutral-200 bg-white p-3 text-sm text-neutral-700 whitespace-pre-wrap">
                          {sup.service_details}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="mb-1 text-xs font-black uppercase tracking-wide text-neutral-400">
                        Update Status
                      </div>
                      <select
                        value={sup.status}
                        onChange={(e) =>
                          updateStatus.mutate({
                            id: sup.id,
                            status: e.target.value as ApiSupplier["status"],
                          })
                        }
                        className={inputCls}
                      >
                        <option value="new">New</option>
                        <option value="review">In Review</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ── Shared helpers ─────────────────────────────────────────────────────────────
export const inputCls =
  "w-full rounded-md border border-neutral-200 px-3 py-2 text-sm outline-none transition focus:border-[var(--brand-green)]";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-black text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

function PageImageField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const uploadMut = useUploadMedia();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await uploadMut.mutateAsync({ file, altText: file.name });
    onChange(result.data.secure_url);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="flex items-start gap-3">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-neutral-100">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-[9px] text-neutral-400">
            No image
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or upload a file"
          className={`w-full ${inputCls}`}
        />
        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-black text-neutral-700 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]">
          <Upload className="h-3.5 w-3.5" />
          {uploadMut.isPending ? "Uploading…" : "Upload"}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={uploadMut.isPending}
          />
        </label>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <div className="mb-1 text-xs font-black uppercase tracking-wide text-neutral-400">
        {label}
      </div>
      <div className="text-sm text-neutral-700">{value}</div>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Boxes;
}) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
      <Icon className="mb-4 h-6 w-6 text-[var(--brand-green)]" />
      <div className="text-3xl font-black">{value}</div>
      <div className="mt-1 text-sm font-bold text-neutral-500">{label}</div>
    </div>
  );
}
