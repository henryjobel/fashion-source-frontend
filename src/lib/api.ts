const BASE_URL = ((import.meta.env.VITE_API_URL as string | undefined) ?? "").replace(/\/+$/, "");
const API_ORIGIN = getOrigin(BASE_URL);
const TOKEN_KEY = "fsbd-admin-token";

function getOrigin(value: string) {
  if (!value) return "";
  try {
    return new URL(value).origin;
  } catch {
    return "";
  }
}

export function resolveApiAssetUrl(value?: string | null) {
  if (!value) return "";
  if (!API_ORIGIN) return value;

  try {
    const url = new URL(value, API_ORIGIN);
    const isLocalApiUrl = ["localhost", "127.0.0.1", "0.0.0.0"].includes(url.hostname);
    if (isLocalApiUrl && url.pathname.startsWith("/api/")) {
      return `${API_ORIGIN}${url.pathname}${url.search}${url.hash}`;
    }
    if (value.startsWith("/api/")) {
      return `${API_ORIGIN}${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return value;
  }

  return value;
}

function normalizeCategory(category: ApiCategory): ApiCategory {
  return {
    ...category,
    catalogue_url: resolveApiAssetUrl(category.catalogue_url),
  };
}

// ── Token helpers ──────────────────────────────────────────────────────────────
export const auth = {
  getToken: () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
  isLoggedIn: () => (typeof window !== "undefined" ? !!localStorage.getItem(TOKEN_KEY) : false),
};

// ── Backend response types ─────────────────────────────────────────────────────
export type ApiProduct = {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  description: string;
  image_url: string;
  specs: string[];
  status: "active" | "draft";
  sort_order: number;
  category_id: string | null;
  category_slug: string;
  category_title: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiCategory = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  description: string;
  catalogue_url: string;
  catalogue_name: string;
  parent: string | null;
  parent_id: string | null;
  parent_slug: string;
  parent_title: string;
  sort_order: number;
  status: "active" | "draft";
};

export type ApiInquiry = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "open" | "review" | "closed" | "archived";
  createdAt: string;
};

export type ApiSupplier = {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  website: string;
  country: string;
  monthly_capacity: string;
  service_details: string;
  profile_url: string;
  status: "new" | "review" | "approved" | "rejected";
  createdAt: string;
};

export type ApiMedia = {
  id: string;
  public_id: string;
  url: string;
  secure_url: string;
  resource_type: string;
  folder: string;
  alt_text: string;
  createdAt: string;
};

export type ApiPage = {
  id: string;
  slug: string;
  title: string;
  status: "published" | "draft";
  seo_title: string;
  seo_description: string;
  sections: {
    section_key: string;
    label: string;
    section_type: string;
    content: Record<string, unknown>;
    sort_order: number;
  }[];
  createdAt: string;
  updatedAt: string;
};

export type ApiSettings = Record<string, string>;
export type ApiAdmin = { id: string; email: string; name: string };

export type ApiNavigationItem = {
  id: string;
  location: "header" | "footer";
  label: string;
  url: string;
  parent: string | null;
  group: string;
  sort_order: number;
  target_blank: boolean;
  status: "active" | "hidden";
  createdAt: string;
};

// ── Error class ────────────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Core fetch helper ──────────────────────────────────────────────────────────
async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  isFormData = false,
): Promise<T> {
  const token = auth.getToken();
  const headers: Record<string, string> = isFormData ? {} : { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...((options.headers as Record<string, string>) ?? {}) },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: "Request failed" }));
    throw new ApiError(res.status, (body as { message?: string }).message ?? "Request failed");
  }

  return res.json() as Promise<T>;
}

// ── API surface ────────────────────────────────────────────────────────────────
export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiFetch<{ token: string; admin: ApiAdmin }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => apiFetch<{ admin: ApiAdmin }>("/api/auth/me"),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiFetch<{ message: string }>("/api/auth/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // Products
  getProducts: () => apiFetch<{ data: ApiProduct[] }>("/api/products"),
  getProduct: (slug: string) => apiFetch<{ data: ApiProduct }>(`/api/products/${slug}`),
  createProduct: (body: {
    name: string;
    short_name?: string;
    description?: string;
    image_url?: string;
    specs?: string[];
    category_slug?: string;
    category?: string | null;
    category_id?: string | null;
    status?: "active" | "draft";
    sort_order?: number;
  }) =>
    apiFetch<{ id: string; slug: string }>("/api/products", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateProduct: (id: string, body: Partial<ApiProduct>) =>
    apiFetch<{ message: string }>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteProduct: (id: string) =>
    apiFetch<{ message: string }>(`/api/products/${id}`, { method: "DELETE" }),

  // Categories
  getCategories: () =>
    apiFetch<{ data: ApiCategory[] }>("/api/categories").then((response) => ({
      ...response,
      data: response.data.map(normalizeCategory),
    })),
  createCategory: (body: {
    title: string;
    intro?: string;
    description?: string;
    catalogue_url?: string;
    catalogue_name?: string;
    parent?: string | null;
    status?: "active" | "draft";
    sort_order?: number;
  }) =>
    apiFetch<{ id: string; slug: string }>("/api/categories", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateCategory: (id: string, body: Partial<ApiCategory>) =>
    apiFetch<{ message: string }>(`/api/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteCategory: (id: string) =>
    apiFetch<{ message: string }>(`/api/categories/${id}`, { method: "DELETE" }),

  // Settings
  getSettings: () => apiFetch<{ data: ApiSettings }>("/api/settings"),
  updateSettings: (settings: ApiSettings) =>
    apiFetch<{ message: string }>("/api/settings", {
      method: "PUT",
      body: JSON.stringify(settings),
    }),

  // Inquiries
  getInquiries: () => apiFetch<{ data: ApiInquiry[] }>("/api/inquiries"),
  submitInquiry: (body: {
    type?: string;
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  }) =>
    apiFetch<{ id: string; message: string }>("/api/inquiries", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateInquiryStatus: (id: string, status: ApiInquiry["status"]) =>
    apiFetch<{ message: string }>(`/api/inquiries/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // Suppliers
  getSuppliers: () => apiFetch<{ data: ApiSupplier[] }>("/api/suppliers"),
  submitSupplier: (body: {
    company_name: string;
    contact_person?: string;
    email?: string;
    website?: string;
    country?: string;
    monthly_capacity?: string;
    service_details?: string;
    profile_url?: string;
  }) =>
    apiFetch<{ id: string; message: string }>("/api/suppliers", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateSupplierStatus: (id: string, status: ApiSupplier["status"]) =>
    apiFetch<{ message: string }>(`/api/suppliers/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // Media
  getMedia: () => apiFetch<{ data: ApiMedia[] }>("/api/media"),
  uploadMedia: (file: File, altText?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    if (altText) formData.append("alt_text", altText);
    return apiFetch<{ id: string; data: { url: string; secure_url: string } }>(
      "/api/media/upload",
      { method: "POST", body: formData },
      true,
    ).then((response) => ({
      ...response,
      data: {
        url: resolveApiAssetUrl(response.data.url),
        secure_url: resolveApiAssetUrl(response.data.secure_url),
      },
    }));
  },

  // Pages
  getPages: () => apiFetch<{ data: ApiPage[] }>("/api/pages"),
  getPage: (slug: string) => apiFetch<{ data: ApiPage }>(`/api/pages/${slug}`),
  createPage: (body: Partial<ApiPage> & { slug: string; title: string }) =>
    apiFetch<{ id: string }>("/api/pages", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updatePage: (id: string, body: Partial<ApiPage>) =>
    apiFetch<{ message: string }>(`/api/pages/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deletePage: (id: string) =>
    apiFetch<{ message: string }>(`/api/pages/${id}`, { method: "DELETE" }),

  // Navigation
  getNavigation: (location?: "header" | "footer") =>
    apiFetch<{ data: ApiNavigationItem[] }>(
      `/api/navigation${location ? `?location=${location}` : ""}`,
    ),
  createNavigationItem: (body: {
    location: "header" | "footer";
    label: string;
    url?: string;
    parent?: string | null;
    group?: string;
    sort_order?: number;
    target_blank?: boolean;
    status?: "active" | "hidden";
  }) =>
    apiFetch<{ id: string }>("/api/navigation", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  updateNavigationItem: (id: string, body: Partial<ApiNavigationItem>) =>
    apiFetch<{ message: string }>(`/api/navigation/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteNavigationItem: (id: string) =>
    apiFetch<{ message: string }>(`/api/navigation/${id}`, { method: "DELETE" }),

  // Media (delete)
  deleteMedia: (id: string) =>
    apiFetch<{ message: string }>(`/api/media/${id}`, { method: "DELETE" }),
};
