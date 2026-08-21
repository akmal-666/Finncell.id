import React, { useEffect, useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { seoService } from '@/services/seoService';
import type { GlobalSeoSettings, SeoMetadata, SeoRedirect, SeoStats, SeoSchemaType } from '@fincell/shared';
import {
  Search,
  Globe,
  FileText,
  Link2,
  Settings,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Copy,
  MousePointerClick,
  Eye,
  BarChart2,
  CheckCircle2,
  ArrowUpRight,
  Tag,
  Bot
} from 'lucide-react';

const SCHEMA_OPTIONS: { value: SeoSchemaType; label: string }[] = [
  { value: 'WebPage', label: 'WebPage' },
  { value: 'Product', label: 'Product' },
  { value: 'Organization', label: 'Organization' },
  { value: 'LocalBusiness', label: 'LocalBusiness' },
  { value: 'BreadcrumbList', label: 'BreadcrumbList' },
  { value: 'FAQPage', label: 'FAQPage' },
  { value: 'Article', label: 'Article' },
  { value: 'ItemList', label: 'ItemList' },
];

// ── Stat Card ──────────────────────────────────────────────────────────────────
const StatCard: React.FC<{
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ label, value, icon, color }) => (
  <Card className="p-5 bg-white border border-gray-200 hover:shadow-sm transition">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
    </div>
    <p className="text-3xl font-black text-[#111111]">{value}</p>
  </Card>
);

// ── Section Header ─────────────────────────────────────────────────────────────
const SectionHeader: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string }> = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
    <div className="p-2 rounded-lg bg-gray-100 text-[#B88632]">{icon}</div>
    <div>
      <h3 className="text-sm font-extrabold text-[#111111] uppercase tracking-wider">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

export const AdminSeoPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'global' | 'metadata' | 'redirects' | 'sitemap' | 'robots'>('global');

  // ── Stats
  const [stats, setStats] = useState<SeoStats>({ indexedPages: 0, clicks: 0, impressions: 0, averageCtr: 0 });

  // ── Global SEO
  const [globalSettings, setGlobalSettings] = useState<GlobalSeoSettings>({
    websiteName: 'fincell.id',
    defaultTitle: 'fincell.id — Toko iPhone & Apple Ecosystem Garansi Resmi',
    defaultDescription: 'Beli iPhone 15, 14, 13 series bergaransi resmi Apple Indonesia. Nikmati promo & Trade-in instan.',
    defaultOgImage: 'https://fincell.id/og-image.jpg',
    googleSearchConsoleToken: '',
    googleAnalyticsId: '',
    titleSeparator: '—',
  });
  const [isSavingGlobal, setIsSavingGlobal] = useState<boolean>(false);

  // ── Entity Metadata
  const [allMetadata, setAllMetadata] = useState<SeoMetadata[]>([]);
  const [metaFilter, setMetaFilter] = useState<string>('all');
  const [metaSearch, setMetaSearch] = useState<string>('');
  const [editingMeta, setEditingMeta] = useState<SeoMetadata | null>(null);
  const [isMetaModalOpen, setIsMetaModalOpen] = useState<boolean>(false);
  const [metaForm, setMetaForm] = useState<Partial<SeoMetadata>>({
    indexDirective: 'index',
    followDirective: 'follow',
    schemaType: 'WebPage',
  });
  const [isSavingMeta, setIsSavingMeta] = useState<boolean>(false);

  // ── Redirects
  const [redirects, setRedirects] = useState<SeoRedirect[]>([]);
  const [newSource, setNewSource] = useState<string>('');
  const [newTarget, setNewTarget] = useState<string>('');
  const [newRedirType, setNewRedirType] = useState<'301' | '302'>('301');
  const [isSavingRedir, setIsSavingRedir] = useState<boolean>(false);

  // ── Sitemap & Robots
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [robotsTxt, setRobotsTxt] = useState<string>('');
  const [isSavingRobots, setIsSavingRobots] = useState<boolean>(false);
  const [isGenSitemap, setIsGenSitemap] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      seoService.getStats(),
      seoService.getGlobalSettings(),
      seoService.getAllMetadata(),
      seoService.getRedirects(),
      seoService.getRobots(),
    ]).then(([statsRes, globalRes, metaRes, redirRes, robots]) => {
      if (statsRes.data) setStats(statsRes.data);
      if (globalRes.data) setGlobalSettings(globalRes.data);
      if (metaRes.data) setAllMetadata(metaRes.data);
      if (redirRes.data) setRedirects(redirRes.data);
      setRobotsTxt(robots);
    }).finally(() => setIsLoading(false));
  }, []);

  const filteredMeta = useMemo(() => {
    return allMetadata.filter(m => {
      if (metaFilter !== 'all' && m.entityType !== metaFilter) return false;
      if (metaSearch.trim()) {
        const q = metaSearch.toLowerCase();
        return m.entityId.toLowerCase().includes(q) || (m.seoTitle || '').toLowerCase().includes(q);
      }
      return true;
    });
  }, [allMetadata, metaFilter, metaSearch]);

  // ── Handlers ──
  const handleSaveGlobal = async () => {
    setIsSavingGlobal(true);
    try {
      const res = await seoService.updateGlobalSettings(globalSettings);
      toast('SEO Global Disimpan', { type: 'success', message: 'Pengaturan SEO global berhasil diperbarui.' });
    } finally {
      setIsSavingGlobal(false);
    }
  };

  const handleOpenMetaModal = (meta?: SeoMetadata) => {
    if (meta) {
      setEditingMeta(meta);
      setMetaForm(meta);
    } else {
      setEditingMeta(null);
      setMetaForm({ indexDirective: 'index', followDirective: 'follow', schemaType: 'WebPage', entityType: 'page', entityId: '' });
    }
    setIsMetaModalOpen(true);
  };

  const handleSaveMeta = async () => {
    if (!metaForm.entityType || !metaForm.entityId) {
      toast('Data Tidak Lengkap', { type: 'error', message: 'Entity Type dan Entity ID wajib diisi.' });
      return;
    }
    setIsSavingMeta(true);
    try {
      const res = await seoService.saveMetadata(metaForm.entityType!, metaForm.entityId!, metaForm);
      if (res.success) {
        toast('SEO Metadata Disimpan', { type: 'success', message: `SEO untuk ${metaForm.entityType}/${metaForm.entityId} berhasil disimpan.` });
        // Refresh list
        const freshRes = await seoService.getAllMetadata();
        if (freshRes.data) setAllMetadata(freshRes.data);
        setIsMetaModalOpen(false);
      }
    } finally {
      setIsSavingMeta(false);
    }
  };

  const handleAddRedirect = async () => {
    if (!newSource || !newTarget) {
      toast('Data Tidak Lengkap', { type: 'error', message: 'Source URL dan Target URL wajib diisi.' });
      return;
    }
    setIsSavingRedir(true);
    try {
      const res = await seoService.createRedirect({ source: newSource, target: newTarget, type: newRedirType });
      if (res.success && res.data) {
        setRedirects(prev => [res.data, ...prev]);
        setNewSource('');
        setNewTarget('');
        toast('Redirect Dibuat', { type: 'success', message: `${newRedirType} ${newSource} → ${newTarget}` });
      }
    } finally {
      setIsSavingRedir(false);
    }
  };

  const handleDeleteRedirect = async (id: string, source: string) => {
    if (window.confirm(`Hapus redirect "${source}"?`)) {
      await seoService.deleteRedirect(id);
      setRedirects(prev => prev.filter(r => r.id !== id));
      toast('Redirect Dihapus', { type: 'info', message: '' });
    }
  };

  const handleGenSitemap = async () => {
    setIsGenSitemap(true);
    try {
      const xml = await seoService.getSitemapPreview();
      setSitemapXml(xml);
      toast('Sitemap Dibuat', { type: 'success', message: 'Sitemap XML berhasil digenerate dari database.' });
    } finally {
      setIsGenSitemap(false);
    }
  };

  const handleSaveRobots = async () => {
    setIsSavingRobots(true);
    try {
      await seoService.saveRobots(robotsTxt);
      toast('robots.txt Disimpan', { type: 'success', message: 'Konfigurasi robots.txt berhasil diperbarui.' });
    } finally {
      setIsSavingRobots(false);
    }
  };

  const tabs: { key: typeof activeTab; label: string; icon: React.ReactNode }[] = [
    { key: 'global', label: 'Global SEO', icon: <Globe className="w-4 h-4" /> },
    { key: 'metadata', label: 'Pages & Entities', icon: <Tag className="w-4 h-4" /> },
    { key: 'redirects', label: 'Redirects', icon: <Link2 className="w-4 h-4" /> },
    { key: 'sitemap', label: 'Sitemap.xml', icon: <FileText className="w-4 h-4" /> },
    { key: 'robots', label: 'Robots.txt', icon: <Bot className="w-4 h-4" /> },
  ];

  return (
    <PageContainer
      title="SEO & Meta Tags CMS"
      subtitle="Kelola SEO global, per-halaman, Open Graph, structured data, sitemap, robots.txt, dan redirects terpusat."
    >
      <div className="space-y-6">
        {/* ── STAT CARDS ── */}
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Halaman Terindeks" value={stats.indexedPages} color="bg-emerald-50 text-emerald-600" icon={<CheckCircle2 className="w-5 h-5" />} />
            <StatCard label="Total Klik" value={stats.clicks || '—'} color="bg-blue-50 text-blue-600" icon={<MousePointerClick className="w-5 h-5" />} />
            <StatCard label="Impressions" value={stats.impressions || '—'} color="bg-purple-50 text-purple-600" icon={<Eye className="w-5 h-5" />} />
            <StatCard label="Rata-rata CTR" value={stats.averageCtr ? `${stats.averageCtr}%` : '—'} color="bg-amber-50 text-amber-600" icon={<BarChart2 className="w-5 h-5" />} />
          </div>
        )}

        {/* ── TABS ── */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-[#111111] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ──────────── TAB: GLOBAL SEO ──────────── */}
        {activeTab === 'global' && (
          <div className="space-y-6 max-w-3xl">
            <Card className="p-6 space-y-4 border border-gray-200">
              <SectionHeader icon={<Globe className="w-4 h-4" />} title="Global SEO Defaults" subtitle="Digunakan jika halaman tidak memiliki SEO tersendiri" />

              <Input
                label="Nama Website (Schema org:name)"
                value={globalSettings.websiteName}
                onChange={e => setGlobalSettings(s => ({ ...s, websiteName: e.target.value }))}
              />
              <Input
                label="Default SEO Title Template *"
                value={globalSettings.defaultTitle}
                onChange={e => setGlobalSettings(s => ({ ...s, defaultTitle: e.target.value }))}
              />
              <Textarea
                label="Default Meta Description *"
                value={globalSettings.defaultDescription}
                onChange={e => setGlobalSettings(s => ({ ...s, defaultDescription: e.target.value }))}
                rows={3}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Default OG Image URL"
                  value={globalSettings.defaultOgImage}
                  onChange={e => setGlobalSettings(s => ({ ...s, defaultOgImage: e.target.value }))}
                />
                <Input
                  label="Title Separator"
                  value={globalSettings.titleSeparator}
                  onChange={e => setGlobalSettings(s => ({ ...s, titleSeparator: e.target.value }))}
                />
              </div>
            </Card>

            <Card className="p-6 space-y-4 border border-gray-200">
              <SectionHeader icon={<Search className="w-4 h-4" />} title="Integrasi Google" subtitle="Google Search Console & Google Analytics" />

              <Input
                label="Google Search Console Verification Token"
                placeholder="google-site-verification=xxxxx"
                value={globalSettings.googleSearchConsoleToken}
                onChange={e => setGlobalSettings(s => ({ ...s, googleSearchConsoleToken: e.target.value }))}
              />
              <Input
                label="Google Analytics Measurement ID"
                placeholder="G-XXXXXXXXXX"
                value={globalSettings.googleAnalyticsId}
                onChange={e => setGlobalSettings(s => ({ ...s, googleAnalyticsId: e.target.value }))}
              />
            </Card>

            <div className="flex justify-end">
              <Button variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />} onClick={handleSaveGlobal} isLoading={isSavingGlobal}>
                Simpan Pengaturan SEO Global
              </Button>
            </div>
          </div>
        )}

        {/* ──────────── TAB: METADATA ──────────── */}
        {activeTab === 'metadata' && (
          <div className="space-y-4">
            <Card className="p-4 flex flex-col sm:flex-row items-center gap-4 border border-gray-200">
              <div className="w-full sm:w-56">
                <Select
                  options={[
                    { value: 'all', label: 'Semua Entitas' },
                    { value: 'page', label: 'Halaman Statis' },
                    { value: 'product', label: 'Produk' },
                    { value: 'category', label: 'Kategori' },
                    { value: 'blog', label: 'Blog Post' },
                  ]}
                  value={metaFilter}
                  onChange={e => setMetaFilter(e.target.value)}
                />
              </div>
              <div className="w-full sm:flex-1">
                <Input
                  placeholder="Cari entity ID atau SEO title..."
                  value={metaSearch}
                  onChange={e => setMetaSearch(e.target.value)}
                  leftIcon={<Search className="w-4 h-4 text-gray-400" />}
                />
              </div>
              <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => handleOpenMetaModal()}>
                Tambah SEO
              </Button>
            </Card>

            <Card className="overflow-hidden border border-gray-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-bold">Entity</TableHead>
                    <TableHead className="text-xs font-bold">SEO Title</TableHead>
                    <TableHead className="text-xs font-bold">Schema</TableHead>
                    <TableHead className="text-xs font-bold">Directive</TableHead>
                    <TableHead className="text-xs font-bold text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMeta.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-xs text-gray-400">
                        Belum ada SEO metadata yang tersimpan. Klik "+ Tambah SEO" untuk mulai.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMeta.map(m => (
                      <TableRow key={m.id} className="hover:bg-gray-50/70">
                        <TableCell>
                          <div className="space-y-0.5">
                            <Badge variant="secondary" size="sm">{m.entityType}</Badge>
                            <p className="text-xs font-mono text-gray-500">{m.entityId}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs font-medium text-[#111111] max-w-xs truncate">
                          {m.seoTitle || <span className="text-gray-300">—</span>}
                        </TableCell>
                        <TableCell>
                          {m.schemaType && <Badge variant="secondary" size="sm">{m.schemaType}</Badge>}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1 flex-wrap">
                            <Badge variant={m.indexDirective === 'noindex' ? 'warning' : 'success'} size="sm">
                              {m.indexDirective}
                            </Badge>
                            <Badge variant="secondary" size="sm">{m.followDirective}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenMetaModal(m)} iconOnly={<Settings className="w-4 h-4 text-blue-600" />} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* ──────────── TAB: REDIRECTS ──────────── */}
        {activeTab === 'redirects' && (
          <div className="space-y-4 max-w-4xl">
            <Card className="p-6 space-y-4 border border-gray-200">
              <SectionHeader icon={<Link2 className="w-4 h-4" />} title="Tambah Redirect Baru" subtitle="Redirect Source URL ke Target URL (301/302)" />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
                <div className="sm:col-span-2">
                  <Input label="Source URL" placeholder="/produk-lama" value={newSource} onChange={e => setNewSource(e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <Input label="Target URL" placeholder="/produk/iphone-15-pro" value={newTarget} onChange={e => setNewTarget(e.target.value)} />
                </div>
                <div>
                  <Select
                    label="Tipe"
                    options={[{ value: '301', label: '301 Permanent' }, { value: '302', label: '302 Temporary' }]}
                    value={newRedirType}
                    onChange={e => setNewRedirType(e.target.value as '301' | '302')}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={handleAddRedirect} isLoading={isSavingRedir}>
                  Tambah Redirect
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden border border-gray-200 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-xs font-bold">Tipe</TableHead>
                    <TableHead className="text-xs font-bold">Source URL</TableHead>
                    <TableHead className="text-xs font-bold">Target URL</TableHead>
                    <TableHead className="text-xs font-bold text-right">Hapus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redirects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-xs text-gray-400">
                        Belum ada redirect. Tambahkan redirect untuk mengelola URL yang berubah.
                      </TableCell>
                    </TableRow>
                  ) : (
                    redirects.map(r => (
                      <TableRow key={r.id} className="hover:bg-gray-50/70">
                        <TableCell>
                          <Badge variant={r.type === '301' ? 'success' : 'secondary'} size="sm">{r.type}</Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-gray-600">{r.source}</TableCell>
                        <TableCell className="text-xs font-mono text-gray-600 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3 text-[#B88632]" /> {r.target}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteRedirect(r.id, r.source)} iconOnly={<Trash2 className="w-4 h-4 text-rose-600" />} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}

        {/* ──────────── TAB: SITEMAP ──────────── */}
        {activeTab === 'sitemap' && (
          <div className="space-y-4 max-w-4xl">
            <Card className="p-6 space-y-4 border border-gray-200">
              <SectionHeader icon={<FileText className="w-4 h-4" />} title="Sitemap XML Generator" subtitle="Generate sitemap.xml dari seluruh halaman aktif, produk, kategori, dan blog" />

              <div className="flex items-center gap-4">
                <Button variant="primary" size="md" leftIcon={<RefreshCw className="w-4 h-4" />} onClick={handleGenSitemap} isLoading={isGenSitemap}>
                  Generate Sitemap.xml
                </Button>
                <a href="/api/seo/sitemap" target="_blank" rel="noreferrer">
                  <Button variant="outline" size="md" leftIcon={<ArrowUpRight className="w-4 h-4" />}>
                    Lihat Live Sitemap
                  </Button>
                </a>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium">
                📋 Sitemap publik tersedia di: <code className="font-mono font-bold">https://fincell.id/sitemap.xml</code>
              </div>

              {sitemapXml && (
                <div className="relative">
                  <pre className="p-4 bg-gray-900 text-green-400 text-[11px] leading-relaxed rounded-xl overflow-x-auto max-h-80 font-mono">
                    {sitemapXml}
                  </pre>
                  <button
                    onClick={() => { navigator.clipboard.writeText(sitemapXml); toast('Disalin!', { type: 'success', message: '' }); }}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    title="Salin XML"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-700">Halaman yang di-include dalam sitemap:</p>
                <div className="flex flex-wrap gap-2">
                  {['Beranda (/)', 'Katalog Produk', 'Detail Produk (aktif)', 'Kategori', 'Blog (published)', 'Trade In', 'Promo', 'Tentang Kami', 'Hubungi Kami'].map(p => (
                    <span key={p} className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> {p}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ──────────── TAB: ROBOTS.TXT ──────────── */}
        {activeTab === 'robots' && (
          <div className="space-y-4 max-w-3xl">
            <Card className="p-6 space-y-4 border border-gray-200">
              <SectionHeader icon={<Bot className="w-4 h-4" />} title="robots.txt Editor" subtitle="Kontrol akses crawler untuk semua halaman" />

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-800 font-medium">
                📋 robots.txt publik tersedia di: <code className="font-mono font-bold">https://fincell.id/robots.txt</code>
              </div>

              <Textarea
                label="Konten robots.txt"
                value={robotsTxt}
                onChange={e => setRobotsTxt(e.target.value)}
                rows={12}
                className="font-mono text-xs"
              />

              <div className="flex items-center justify-between gap-4">
                <button
                  className="text-xs text-gray-500 hover:text-[#111111] underline"
                  onClick={() => setRobotsTxt(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://fincell.id/sitemap.xml`)}
                >
                  Reset ke Default
                </button>
                <Button variant="primary" size="md" leftIcon={<Save className="w-4 h-4" />} onClick={handleSaveRobots} isLoading={isSavingRobots}>
                  Simpan robots.txt
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* ── METADATA MODAL ── */}
      <Modal
        isOpen={isMetaModalOpen}
        onClose={() => setIsMetaModalOpen(false)}
        title={editingMeta ? `Edit SEO: ${editingMeta.entityType}/${editingMeta.entityId}` : 'Tambah SEO Metadata'}
        size="lg"
      >
        <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Entity Type *"
              options={[
                { value: 'page', label: 'Halaman Statis' },
                { value: 'product', label: 'Produk' },
                { value: 'category', label: 'Kategori' },
                { value: 'blog', label: 'Blog Post' },
              ]}
              value={metaForm.entityType || 'page'}
              onChange={e => setMetaForm(f => ({ ...f, entityType: e.target.value as any }))}
            />
            <Input
              label="Entity ID (Slug) *"
              placeholder="beranda / iphone-15-pro-max / panduan-trade-in"
              value={metaForm.entityId || ''}
              onChange={e => setMetaForm(f => ({ ...f, entityId: e.target.value }))}
            />
          </div>

          <Input
            label="SEO Title"
            placeholder="Judul SEO spesifik untuk halaman ini"
            value={metaForm.seoTitle || ''}
            onChange={e => setMetaForm(f => ({ ...f, seoTitle: e.target.value }))}
          />
          <Textarea
            label="Meta Description"
            placeholder="Deskripsi 150-160 karakter untuk SERP Google"
            value={metaForm.metaDescription || ''}
            onChange={e => setMetaForm(f => ({ ...f, metaDescription: e.target.value }))}
            rows={3}
          />
          <Input
            label="Canonical URL"
            placeholder="https://fincell.id/produk/iphone-15-pro-max"
            value={metaForm.canonicalUrl || ''}
            onChange={e => setMetaForm(f => ({ ...f, canonicalUrl: e.target.value }))}
          />

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Open Graph</p>
            <Input
              label="OG Title"
              placeholder="Judul Open Graph (WhatsApp / Facebook preview)"
              value={metaForm.ogTitle || ''}
              onChange={e => setMetaForm(f => ({ ...f, ogTitle: e.target.value }))}
            />
            <Textarea
              label="OG Description"
              placeholder="Deskripsi Open Graph"
              value={metaForm.ogDescription || ''}
              onChange={e => setMetaForm(f => ({ ...f, ogDescription: e.target.value }))}
              rows={2}
            />
            <Input
              label="OG Image URL"
              placeholder="https://fincell.id/og-image.jpg"
              value={metaForm.ogImage || ''}
              onChange={e => setMetaForm(f => ({ ...f, ogImage: e.target.value }))}
            />
          </div>

          <div className="border-t border-gray-200 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Index Directive"
              options={[{ value: 'index', label: 'index (default)' }, { value: 'noindex', label: 'noindex' }]}
              value={metaForm.indexDirective || 'index'}
              onChange={e => setMetaForm(f => ({ ...f, indexDirective: e.target.value as any }))}
            />
            <Select
              label="Follow Directive"
              options={[{ value: 'follow', label: 'follow (default)' }, { value: 'nofollow', label: 'nofollow' }]}
              value={metaForm.followDirective || 'follow'}
              onChange={e => setMetaForm(f => ({ ...f, followDirective: e.target.value as any }))}
            />
            <Select
              label="Schema Type"
              options={[{ value: '', label: 'Tidak ada' }, ...SCHEMA_OPTIONS]}
              value={metaForm.schemaType || ''}
              onChange={e => setMetaForm(f => ({ ...f, schemaType: e.target.value as SeoSchemaType || undefined }))}
            />
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setIsMetaModalOpen(false)}>Batal</Button>
            <Button variant="primary" size="sm" onClick={handleSaveMeta} isLoading={isSavingMeta}>
              Simpan SEO Metadata
            </Button>
          </div>
        </div>
      </Modal>

    </PageContainer>
  );
};
