import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, auth, type ApiInquiry, type ApiNavigationItem, type ApiSettings } from "./api";

// ── Query keys ─────────────────────────────────────────────────────────────────
export const qk = {
  products: ["products"] as const,
  product: (slug: string) => ["products", slug] as const,
  categories: ["categories"] as const,
  settings: ["settings"] as const,
  inquiries: ["inquiries"] as const,
  suppliers: ["suppliers"] as const,
  media: ["media"] as const,
  pages: ["pages"] as const,
  navigation: (location?: "header" | "footer") => ["navigation", location ?? "all"] as const,
  me: ["me"] as const,
};

// ── Auth ───────────────────────────────────────────────────────────────────────
export function useAdminMe() {
  return useQuery({
    queryKey: qk.me,
    queryFn: () => api.me().then((r) => r.admin),
    enabled: auth.isLoggedIn(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      api.login(email, password),
    onSuccess: (data) => {
      auth.setToken(data.token);
      qc.invalidateQueries({ queryKey: qk.me });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => api.changePassword(currentPassword, newPassword),
  });
}

// ── Products ───────────────────────────────────────────────────────────────────
export function useProducts() {
  return useQuery({
    queryKey: qk.products,
    queryFn: () => api.getProducts().then((r) => r.data),
    staleTime: 60_000,
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: qk.product(slug),
    queryFn: () => api.getProduct(slug).then((r) => r.data),
    staleTime: 60_000,
    enabled: !!slug,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof api.createProduct>[0]) => api.createProduct(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.products }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof api.updateProduct>[1] }) =>
      api.updateProduct(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.products }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteProduct(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.products }),
  });
}

// ── Categories ─────────────────────────────────────────────────────────────────
export function useCategories() {
  return useQuery({
    queryKey: qk.categories,
    queryFn: () => api.getCategories().then((r) => r.data),
    staleTime: 60_000,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof api.createCategory>[0]) => api.createCategory(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.categories }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof api.updateCategory>[1] }) =>
      api.updateCategory(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.categories }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.categories }),
  });
}

// ── Settings ───────────────────────────────────────────────────────────────────
export function useSettings() {
  return useQuery({
    queryKey: qk.settings,
    queryFn: () => api.getSettings().then((r) => r.data),
    staleTime: 60_000,
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (settings: ApiSettings) => api.updateSettings(settings),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.settings }),
  });
}

// ── Inquiries ──────────────────────────────────────────────────────────────────
export function useInquiries() {
  return useQuery({
    queryKey: qk.inquiries,
    queryFn: () => api.getInquiries().then((r) => r.data),
    enabled: auth.isLoggedIn(),
    staleTime: 30_000,
  });
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: (body: Parameters<typeof api.submitInquiry>[0]) => api.submitInquiry(body),
  });
}

export function useUpdateInquiryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApiInquiry["status"] }) =>
      api.updateInquiryStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.inquiries }),
  });
}

// ── Suppliers ──────────────────────────────────────────────────────────────────
export function useSuppliers() {
  return useQuery({
    queryKey: qk.suppliers,
    queryFn: () => api.getSuppliers().then((r) => r.data),
    enabled: auth.isLoggedIn(),
    staleTime: 30_000,
  });
}

export function useSubmitSupplier() {
  return useMutation({
    mutationFn: (body: Parameters<typeof api.submitSupplier>[0]) => api.submitSupplier(body),
  });
}

export function useUpdateSupplierStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: import("./api").ApiSupplier["status"] }) =>
      api.updateSupplierStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.suppliers }),
  });
}

// ── Media ──────────────────────────────────────────────────────────────────────
export function useMedia() {
  return useQuery({
    queryKey: qk.media,
    queryFn: () => api.getMedia().then((r) => r.data),
    enabled: auth.isLoggedIn(),
    staleTime: 30_000,
  });
}

export function useUploadMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, altText }: { file: File; altText?: string }) =>
      api.uploadMedia(file, altText),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.media }),
  });
}

export function useDeleteMedia() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteMedia(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.media }),
  });
}

// ── Pages ──────────────────────────────────────────────────────────────────────
export function useApiPages() {
  return useQuery({
    queryKey: qk.pages,
    queryFn: () => api.getPages().then((r) => r.data),
    staleTime: 60_000,
  });
}

export function useUpsertPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id?: string;
      body: Parameters<typeof api.updatePage>[1] & { slug: string; title: string };
    }): Promise<{ id: string }> =>
      (id ? api.updatePage(id, body) : api.createPage(body)) as Promise<{ id: string }>,
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.pages }),
  });
}

export function useDeletePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deletePage(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.pages }),
  });
}

// ── Navigation ─────────────────────────────────────────────────────────────────
export function useNavigation(location?: "header" | "footer") {
  return useQuery({
    queryKey: qk.navigation(location),
    queryFn: () => api.getNavigation(location).then((r) => r.data),
    staleTime: 60_000,
  });
}

export function useCreateNavigationItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Parameters<typeof api.createNavigationItem>[0]) =>
      api.createNavigationItem(body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["navigation"] }),
  });
}

export function useUpdateNavigationItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<ApiNavigationItem> }) =>
      api.updateNavigationItem(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["navigation"] }),
  });
}

export function useDeleteNavigationItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteNavigationItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["navigation"] }),
  });
}
