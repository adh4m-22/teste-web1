import React, { useState } from 'react';
import { 
  ShoppingBag, Trash2, Plus, LayoutDashboard, Store, X, 
  Image as ImageIcon, Lock, LogOut, Settings, Users, 
  Package, Tag, Truck, List, BarChart3, Edit, Search,
  ChevronDown, CheckCircle, AlertTriangle, Star, Activity, Shield,
  History, UserCog, UserPlus, Key
} from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_SETTINGS = { name: 'AURA EXCLUSIVE', color: '#111827', currency: '$' };

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Premium Heavyweight Hoodie', price: 89.99, stock: 45, category: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=400&q=80', status: 'Published', tags: ['Best Seller'], sizes: ['M', 'L', 'XL'], colors: ['Black', 'Gray'] },
  { id: 2, name: 'Minimalist Cargo Pants', price: 75.00, stock: 12, category: 'Pants', image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=400&q=80', status: 'Published', tags: ['New Arrival'], sizes: ['30', '32', '34'], colors: ['Olive', 'Black'] },
  { id: 3, name: 'Oversized Graphic Tee', price: 35.00, stock: 0, category: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', status: 'Hidden', tags: [], sizes: ['S', 'M', 'L'], colors: ['White'] },
  { id: 4, name: 'Classic Leather Sneakers', price: 120.00, stock: 8, category: 'Shoes', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80', status: 'Published', tags: ['Best Seller'], sizes: ['8', '9', '10', '11'], colors: ['White'] },
];

const INITIAL_ORDERS = [
  { id: 'ORD-5021', customer: 'Alex Johnson', date: '2026-11-02', total: 164.99, status: 'Pending', items: 2 },
  { id: 'ORD-5020', customer: 'Sarah Miller', date: '2026-11-01', total: 89.99, status: 'Processing', items: 1 },
  { id: 'ORD-5019', customer: 'Michael Chen', date: '2026-10-30', total: 245.00, status: 'Shipped', items: 3 },
  { id: 'ORD-5018', customer: 'Emma Davis', date: '2026-10-28', total: 35.00, status: 'Delivered', items: 1 },
];

const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex.j@example.com', orders: 4, totalSpent: 450.50, joinDate: '2026-01-15' },
  { id: 2, name: 'Sarah Miller', email: 'sarah.m@example.com', orders: 1, totalSpent: 89.99, joinDate: '2026-11-01' },
  { id: 3, name: 'Michael Chen', email: 'm.chen@example.com', orders: 12, totalSpent: 1240.00, joinDate: '2025-08-22' },
];

const INITIAL_ADMINS = [
  { id: 1, username: 'admin', password: 'password123', role: 'Super Admin', name: 'System Administrator' },
  { id: 2, username: 'manager', password: 'password123', role: 'Store Manager', name: 'Store Manager' },
];

const INITIAL_LOGS = [
  { id: 1, timestamp: new Date().toLocaleString(), admin: 'System', action: 'Security module initialized.' }
];

// --- MAIN APP ---
export default function App() {
  const [view, setView] = useState('shop'); // 'shop' or 'admin'
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  
  // App-wide state
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [admins, setAdmins] = useState(INITIAL_ADMINS);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Security Logger
  const addLog = (adminName, action) => {
    setLogs(prev => [{ id: Date.now(), timestamp: new Date().toLocaleString(), admin: adminName, action }, ...prev]);
  };

  // Cart logic
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-gray-200">
      {/* Top Navigation */}
      <nav className="border-b border-gray-200 sticky top-0 z-40 shadow-sm transition-colors duration-300" style={{ backgroundColor: settings.color }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-black tracking-widest text-white uppercase">{settings.name}</h1>
              <div className="hidden sm:flex space-x-2">
                <button
                  onClick={() => setView('shop')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'shop' ? 'bg-white/20 text-white shadow-inner' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                >
                  <Store className="w-4 h-4 mr-2" /> Storefront
                </button>
                <button
                  onClick={() => setView('admin')}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'admin' ? 'bg-white/20 text-white shadow-inner' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                >
                  <Lock className="w-4 h-4 mr-2" /> Admin Portal
                </button>
              </div>
            </div>

            {view === 'shop' && (
              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-white/90 hover:text-white transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-black transform translate-x-1/4 -translate-y-1/4 bg-white rounded-full shadow-md">
                    {cart.reduce((count, item) => count + item.quantity, 0)}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content View Switcher */}
      {view === 'shop' ? (
        <Storefront 
          products={products.filter(p => p.status === 'Published')} 
          onAddToCart={addToCart} 
          settings={settings} 
        />
      ) : !loggedInAdmin ? (
        <AdminLogin 
          onLogin={(admin) => {
            setLoggedInAdmin(admin);
            addLog(admin.name, 'Logged in securely');
          }} 
          admins={admins}
          settings={settings} 
        />
      ) : (
        <AdminDashboard 
          products={products} setProducts={setProducts}
          orders={orders} setOrders={setOrders}
          customers={customers}
          admins={admins} setAdmins={setAdmins}
          logs={logs} addLog={addLog}
          loggedInAdmin={loggedInAdmin}
          settings={settings} setSettings={setSettings}
          onLogout={() => {
            addLog(loggedInAdmin.name, 'Logged out');
            setLoggedInAdmin(null);
          }}
        />
      )}

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <CartSidebar 
          cart={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart} 
          total={cartTotal} 
          settings={settings} 
        />
      )}
    </div>
  );
}

// ==========================================
// STOREFRONT COMPONENTS
// ==========================================
function Storefront({ products, onAddToCart, settings }) {
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  return (
    <main className="pb-24">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80" alt="Hero" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">New Season <br/> Arrivals</h2>
          <p className="text-lg text-gray-200 mb-8">Discover our latest collection designed for comfort and style.</p>
          <button 
            className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wide text-sm hover:scale-105 transition-transform"
            style={{ color: settings.color }}
          >
            Shop Now
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Category Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'text-white' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
              style={activeCategory === cat ? { backgroundColor: settings.color } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                {product.tags.includes('New Arrival') && (
                  <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 uppercase tracking-wider rounded">New</span>
                )}
                {product.tags.includes('Best Seller') && (
                  <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wider rounded">Best Seller</span>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-black text-white font-bold px-4 py-2 uppercase tracking-widest text-sm">Sold Out</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 p-5">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-lg font-bold text-gray-900 mb-4">{settings.currency}{product.price.toFixed(2)}</p>
                <button
                  disabled={product.stock === 0}
                  onClick={() => onAddToCart(product)}
                  className={`mt-auto w-full py-3 px-4 flex items-center justify-center font-bold text-sm uppercase tracking-wider transition-colors ${
                    product.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-white hover:opacity-90'
                  }`}
                  style={product.stock > 0 ? { backgroundColor: settings.color } : {}}
                >
                  <Plus className="w-4 h-4 mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function CartSidebar({ cart, onClose, onRemove, total, settings }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold uppercase tracking-wide flex items-center">
            <ShoppingBag className="w-5 h-5 mr-3" /> Cart ({cart.length})
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-200" />
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <img src={item.image} alt={item.name} className="h-24 w-20 object-cover rounded bg-white border border-gray-200" />
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  <div className="mt-auto flex justify-between items-end">
                    <span className="text-sm font-medium text-gray-600">Qty: {item.quantity}</span>
                    <span className="font-bold text-gray-900">{settings.currency}{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total</span>
              <span>{settings.currency}{total.toFixed(2)}</span>
            </div>
            <button 
              className="w-full text-white py-4 rounded font-bold uppercase tracking-widest transition-opacity hover:opacity-90"
              style={{ backgroundColor: settings.color }}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// ADMIN COMPONENTS
// ==========================================
function AdminLogin({ onLogin, admins, settings }) {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundAdmin = admins.find(a => a.username === username && a.password === pwd);
    if (foundAdmin) {
      onLogin(foundAdmin);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: `${settings.color}15`, color: settings.color }}>
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Admin Dashboard</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Enter your credentials to access the control panel.</p>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200 text-center font-medium">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username (admin)"
            value={username}
            onChange={e => {setUsername(e.target.value); setError('');}}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 mb-4 transition-shadow"
            style={{ '--tw-ring-color': settings.color }}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password (password123)"
            value={pwd}
            onChange={e => {setPwd(e.target.value); setError('');}}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 mb-6 transition-shadow"
            style={{ '--tw-ring-color': settings.color }}
          />
          <button 
            type="submit" 
            className="w-full py-3 text-white rounded-lg font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: settings.color }}
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ products, setProducts, orders, setOrders, customers, admins, setAdmins, logs, addLog, loggedInAdmin, settings, setSettings, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: List },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'promotions', label: 'Promotions', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 hidden md:flex">
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-black' : 'text-gray-400'}`} style={activeTab === tab.id ? { color: settings.color } : {}}/>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="mb-4 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold mr-3">
              {loggedInAdmin.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">{loggedInAdmin.name}</p>
              <p className="text-[10px] text-gray-500 uppercase">{loggedInAdmin.role}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Tab Routing */}
          {activeTab === 'dashboard' && <TabDashboard products={products} orders={orders} customers={customers} settings={settings} />}
          {activeTab === 'products' && <TabProducts products={products} setProducts={setProducts} settings={settings} />}
          {activeTab === 'categories' && <TabCategories products={products} settings={settings} />}
          {activeTab === 'inventory' && <TabInventory products={products} settings={settings} />}
          {activeTab === 'orders' && <TabOrders orders={orders} setOrders={setOrders} settings={settings} />}
          {activeTab === 'customers' && <TabCustomers customers={customers} settings={settings} />}
          {activeTab === 'settings' && <TabSettings settings={settings} setSettings={setSettings} addLog={addLog} loggedInAdmin={loggedInAdmin} />}
          {activeTab === 'security' && <TabSecurity admins={admins} setAdmins={setAdmins} logs={logs} loggedInAdmin={loggedInAdmin} addLog={addLog} settings={settings} />}
          {/* Render placeholder for uncompleted tabs to show enterprise structure */}
          {['promotions'].includes(activeTab) && (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Module Under Construction</h3>
              <p className="text-gray-500">This enterprise feature is currently being provisioned.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- ADMIN TABS ---

function TabDashboard({ products, orders, customers, settings }) {
  const totalRev = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`${settings.currency}${totalRev.toFixed(2)}`} icon={BarChart3} trend="+12.5%" />
        <StatCard title="Total Orders" value={orders.length} icon={ShoppingBag} trend="+5.2%" />
        <StatCard title="Total Customers" value={customers.length} icon={Users} trend="+18.1%" />
        <StatCard title="Pending Orders" value={pendingOrders} icon={Package} alert={pendingOrders > 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <button className="text-sm font-medium text-blue-600 hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.slice(0,4).map(order => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-sm">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{settings.currency}{order.total.toFixed(2)}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { text: 'New order #ORD-5021 placed', time: '10 mins ago', icon: ShoppingBag },
              { text: 'Stock alert: Oversized Tee', time: '1 hour ago', icon: AlertTriangle, alert: true },
              { text: 'Product "Cargo Pants" added', time: '3 hours ago', icon: Plus },
            ].map((act, i) => (
              <div key={i} className="flex items-start">
                <div className={`p-2 rounded-full mr-3 ${act.alert ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  <act.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{act.text}</p>
                  <p className="text-xs text-gray-500">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabProducts({ products, setProducts, settings }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Products ({products.length})</h2>
        <button className="flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: settings.color }}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2" style={{ '--tw-ring-color': settings.color }} />
          </div>
          <select className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white">
            <option>All Categories</option>
            <option>Hoodies</option>
            <option>Pants</option>
          </select>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 flex items-center">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded object-cover border border-gray-200 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.category} {p.tags.length>0 && `• ${p.tags.join(', ')}`}</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{settings.currency}{p.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {p.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-gray-400 hover:text-blue-600 p-1"><Edit className="w-4 h-4"/></button>
                  <button className="text-gray-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabOrders({ orders, setOrders, settings }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{o.id}</td>
                <td className="px-6 py-4 text-gray-500">{o.date}</td>
                <td className="px-6 py-4">{o.customer}</td>
                <td className="px-6 py-4 font-medium">{settings.currency}{o.total.toFixed(2)}</td>
                <td className="px-6 py-4"><StatusBadge status={o.status} /></td>
                <td className="px-6 py-4 text-right">
                  <select className="border border-gray-300 rounded text-xs px-2 py-1 bg-white focus:outline-none">
                    <option value="">Update Status</option>
                    <option value="Processing">Mark Processing</option>
                    <option value="Shipped">Mark Shipped</option>
                    <option value="Delivered">Mark Delivered</option>
                    <option value="Cancelled">Cancel Order</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabInventory({ products, settings }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Inventory & Variants</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-sm text-gray-500 mb-6">Manage stock levels for product variations (sizes, colors).</p>
        <div className="space-y-6">
          {products.map(p => (
            <div key={p.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src={p.image} className="w-8 h-8 rounded object-cover" />
                  <span className="font-semibold text-sm">{p.name}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-white border border-gray-200 rounded shadow-sm">Total Stock: {p.stock}</span>
              </div>
              <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sizes Available</p>
                  <div className="flex gap-2">
                    {p.sizes.map(s => <span key={s} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs">{s}</span>)}
                    {p.sizes.length === 0 && <span className="text-xs text-gray-400">One Size</span>}
                  </div>
                </div>
                <div>
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Colors Available</p>
                  <div className="flex gap-2">
                    {p.colors.map(c => <span key={c} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs">{c}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabCategories() {
  const cats = ['Men', 'Women', 'Kids', 'Shoes', 'Hoodies', 'T-Shirts', 'Accessories'];
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button className="flex items-center px-4 py-2 bg-black text-white text-sm font-medium rounded-lg"><Plus className="w-4 h-4 mr-2"/> New Category</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cats.map(c => (
          <div key={c} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center group cursor-pointer hover:border-black transition-colors">
            <span className="font-medium">{c}</span>
            <div className="hidden group-hover:flex space-x-2">
              <Edit className="w-4 h-4 text-gray-400 hover:text-black"/>
              <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabCustomers({ customers, settings }) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Customers List</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Orders</th>
              <th className="px-6 py-3">Total Spent</th>
              <th className="px-6 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                <td className="px-6 py-4 text-gray-500">{c.email}</td>
                <td className="px-6 py-4">{c.orders}</td>
                <td className="px-6 py-4 font-medium">{settings.currency}{c.totalSpent.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-500">{c.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabSecurity({ admins, setAdmins, logs, loggedInAdmin, addLog, settings }) {
  const [subTab, setSubTab] = useState('admins');
  const [newAdmin, setNewAdmin] = useState({ username: '', password: '', role: 'Store Manager', name: '' });
  const [passForm, setPassForm] = useState({ old: '', new: '' });
  const [passMsg, setPassMsg] = useState({ text: '', type: '' });

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!newAdmin.username || !newAdmin.password || !newAdmin.name) return;
    setAdmins([...admins, { ...newAdmin, id: Date.now() }]);
    addLog(loggedInAdmin.name, `Created new admin account for ${newAdmin.username} (${newAdmin.role})`);
    setNewAdmin({ username: '', password: '', role: 'Store Manager', name: '' });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passForm.old === loggedInAdmin.password) {
      setAdmins(admins.map(a => a.id === loggedInAdmin.id ? { ...a, password: passForm.new } : a));
      addLog(loggedInAdmin.name, 'Changed their password');
      setPassMsg({ text: 'Password updated successfully!', type: 'success' });
      setPassForm({ old: '', new: '' });
    } else {
      setPassMsg({ text: 'Incorrect old password.', type: 'error' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Security & Access Control</h2>
      
      {/* Sub-navigation */}
      <div className="flex space-x-2 border-b border-gray-200">
        {[
          { id: 'admins', label: 'Admins', icon: Users },
          { id: 'roles', label: 'Roles & Permissions', icon: Shield },
          { id: 'logs', label: 'Activity Logs', icon: History },
          { id: 'profile', label: 'My Profile', icon: UserCog },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id)}
            className={`flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              subTab === tab.id 
                ? 'border-gray-900 text-gray-900' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Admins Sub-tab */}
      {subTab === 'admins' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {admins.map(admin => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{admin.name} {admin.id === loggedInAdmin.id && <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase">You</span>}</td>
                    <td className="px-6 py-4 text-gray-500">{admin.username}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${admin.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                        {admin.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button disabled={admin.role === 'Super Admin' && admin.id !== loggedInAdmin.id} className="text-gray-400 hover:text-red-600 p-1 disabled:opacity-30 disabled:hover:text-gray-400">
                        <Trash2 className="w-4 h-4"/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center"><UserPlus className="w-5 h-5 mr-2" /> Add New Admin</h3>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" value={newAdmin.name} onChange={e => setNewAdmin({...newAdmin, name: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': settings.color }} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
                <input required type="text" value={newAdmin.username} onChange={e => setNewAdmin({...newAdmin, username: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': settings.color }} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                <input required type="password" value={newAdmin.password} onChange={e => setNewAdmin({...newAdmin, password: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': settings.color }} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                <select value={newAdmin.role} onChange={e => setNewAdmin({...newAdmin, role: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': settings.color }}>
                  <option>Store Manager</option>
                  <option>Order Processor</option>
                  <option>Super Admin</option>
                </select>
              </div>
              <button type="submit" className="w-full text-white py-2 rounded text-sm font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: settings.color }}>Create Account</button>
            </form>
          </div>
        </div>
      )}

      {/* Roles Sub-tab */}
      {subTab === 'roles' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-3xl">
          <h3 className="text-lg font-semibold mb-6">Permission Levels</h3>
          <div className="space-y-6">
            <div className="flex border border-purple-100 bg-purple-50/30 rounded-lg p-4">
              <Shield className="w-6 h-6 text-purple-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Super Admin</h4>
                <p className="text-sm text-gray-600">Full system access. Can modify store settings, manage all other admin accounts, view security logs, and perform all lower-level actions.</p>
              </div>
            </div>
            <div className="flex border border-gray-200 rounded-lg p-4">
              <Store className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Store Manager</h4>
                <p className="text-sm text-gray-600">Can manage products, categories, inventory, and promotions. Cannot access security logs, settings, or create other admins.</p>
              </div>
            </div>
            <div className="flex border border-gray-200 rounded-lg p-4">
              <Package className="w-6 h-6 text-green-600 mr-4 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Order Processor</h4>
                <p className="text-sm text-gray-600">Restricted access to the Orders and Customers tabs only. Used for fulfillment staff.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logs Sub-tab */}
      {subTab === 'logs' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3">Action Performed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{log.admin}</td>
                  <td className="px-6 py-4 text-gray-600">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Profile Sub-tab */}
      {subTab === 'profile' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-md">
          <h3 className="text-lg font-semibold mb-6 flex items-center"><Key className="w-5 h-5 mr-2" /> Change Password</h3>
          {passMsg.text && (
            <div className={`p-3 rounded mb-4 text-sm ${passMsg.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {passMsg.text}
            </div>
          )}
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input required type="password" value={passForm.old} onChange={e => setPassForm({...passForm, old: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': settings.color }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input required type="password" value={passForm.new} onChange={e => setPassForm({...passForm, new: e.target.value})} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:outline-none" style={{ '--tw-ring-color': settings.color }} />
            </div>
            <button type="submit" className="w-full text-white py-2 rounded-md font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: settings.color }}>Update Password</button>
          </form>
        </div>
      )}
    </div>
  );
}

function TabSettings({ settings, setSettings, addLog, loggedInAdmin }) {
  const handleSettingChange = (key, value) => {
    setSettings({...settings, [key]: value});
  };

  const handleBlur = (settingName) => {
    addLog(loggedInAdmin.name, `Updated store setting: ${settingName}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900">Store Settings</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        
        <div>
          <h3 className="text-lg font-semibold border-b border-gray-100 pb-2 mb-4">Branding</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
              <input 
                type="text" 
                value={settings.name} 
                onChange={e => handleSettingChange('name', e.target.value)}
                onBlur={() => handleBlur('Store Name')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': settings.color }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Brand Color</label>
              <div className="flex items-center space-x-3">
                <input 
                  type="color" 
                  value={settings.color} 
                  onChange={e => handleSettingChange('color', e.target.value)}
                  onBlur={() => handleBlur('Brand Color')}
                  className="h-10 w-16 p-1 rounded cursor-pointer border border-gray-300"
                />
                <span className="text-sm font-mono text-gray-500">{settings.color}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">This color will be used for buttons, active tabs, and highlights across the storefront and admin panel.</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b border-gray-100 pb-2 mb-4">Localization & Shipping</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency Symbol</label>
              <select 
                value={settings.currency}
                onChange={e => {
                  handleSettingChange('currency', e.target.value);
                  handleBlur('Currency Symbol');
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
              >
                <option value="$">USD ($)</option>
                <option value="€">EUR (€)</option>
                <option value="£">GBP (£)</option>
                <option value="MAD ">MAD (Moroccan Dirham)</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium text-gray-900">Cash on Delivery (COD)</p>
                <p className="text-xs text-gray-500">Allow customers to pay upon receiving items.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`} style={{ backgroundColor: settings.color }}></div>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- UTILS ---

function StatCard({ title, value, icon: Icon, trend, alert }) {
  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border ${alert ? 'border-red-200' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${alert ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && <p className="text-xs font-medium text-green-600 mt-3 flex items-center">↑ {trend} <span className="text-gray-400 ml-1 font-normal">vs last month</span></p>}
      {alert && <p className="text-xs font-medium text-red-600 mt-3 flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> Action required</p>}
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    'Published': 'bg-green-100 text-green-700',
    'Hidden': 'bg-gray-100 text-gray-700',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
}