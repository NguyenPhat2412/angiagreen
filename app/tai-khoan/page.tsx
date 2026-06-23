"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Crown,
  Gift,
  Edit,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth-context";
import { useLanguage } from "@/context/language-context";
import Breadcrumb from "@/components/Breadcrumb";
import type { Language, MembershipLevelId } from "@/interface/types";

const membershipColors = {
  member: "bg-zinc-500",
  silver: "bg-zinc-400",
  gold: "bg-yellow-500",
  platinum: "bg-purple-500",
  diamond: "bg-cyan-400",
};

const membershipNames: Record<MembershipLevelId, Record<Language, string>> = {
  member: { vi: "Thành viên", en: "Member", zh: "会员" },
  silver: { vi: "Bạc", en: "Silver", zh: "银卡" },
  gold: { vi: "Vàng", en: "Gold", zh: "金卡" },
  platinum: { vi: "Bạch kim", en: "Platinum", zh: "白金" },
  diamond: { vi: "Kim cương", en: "Diamond", zh: "钻石" },
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  processing: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusNames = {
  pending: { vi: "Chờ xử lý", en: "Pending", zh: "待处理" },
  confirmed: { vi: "Đã xác nhận", en: "Confirmed", zh: "已确认" },
  processing: { vi: "Đang xử lý", en: "Processing", zh: "处理中" },
  shipping: { vi: "Đang giao", en: "Shipping", zh: "配送中" },
  delivered: { vi: "Đã giao", en: "Delivered", zh: "已送达" },
  cancelled: { vi: "Đã hủy", en: "Cancelled", zh: "已取消" },
};

const accountCopy = {
  vi: {
    account: "Tài khoản",
    personalInfo: "Thông tin cá nhân",
    myOrders: "Đơn hàng của tôi",
    favorites: "Sản phẩm yêu thích",
    addresses: "Địa chỉ giao hàng",
    paymentMethods: "Phương thức thanh toán",
    notifications: "Thông báo",
    settings: "Cài đặt",
    points: "Điểm tích lũy",
    redeemPoints: "Đổi điểm",
    overview: "Tổng quan",
    orders: "Đơn hàng",
    reviews: "Đánh giá",
    recentOrders: "Đơn hàng gần đây",
    viewAll: "Xem tất cả",
    details: "Chi tiết",
    noOrders: "Chưa có đơn hàng nào",
    shopNow: "Mua sắm ngay",
    allOrders: "Tất cả đơn hàng",
    productCount: "sản phẩm",
    totalAmount: "Tổng tiền",
    reviewTitle: "Đánh giá của bạn",
    noReviews: "Chưa có đánh giá nào",
    reviewHint: "Đánh giá sản phẩm để nhận điểm thưởng!",
    noOrderHint: "Hãy bắt đầu mua sắm để có đơn hàng đầu tiên!",
  },
  en: {
    account: "Account",
    personalInfo: "Personal information",
    myOrders: "My orders",
    favorites: "Favorite products",
    addresses: "Shipping addresses",
    paymentMethods: "Payment methods",
    notifications: "Notifications",
    settings: "Settings",
    points: "Reward points",
    redeemPoints: "Redeem points",
    overview: "Overview",
    orders: "Orders",
    reviews: "Reviews",
    recentOrders: "Recent orders",
    viewAll: "View all",
    details: "Details",
    noOrders: "No orders yet",
    shopNow: "Shop now",
    allOrders: "All orders",
    productCount: "products",
    totalAmount: "Total",
    reviewTitle: "Your reviews",
    noReviews: "No reviews yet",
    reviewHint: "Review products to earn reward points!",
    noOrderHint: "Start shopping to place your first order!",
  },
  zh: {
    account: "账户",
    personalInfo: "个人信息",
    myOrders: "我的订单",
    favorites: "收藏商品",
    addresses: "收货地址",
    paymentMethods: "支付方式",
    notifications: "通知",
    settings: "设置",
    points: "积分",
    redeemPoints: "兑换积分",
    overview: "概览",
    orders: "订单",
    reviews: "评价",
    recentOrders: "最近订单",
    viewAll: "查看全部",
    details: "详情",
    noOrders: "暂无订单",
    shopNow: "立即购物",
    allOrders: "全部订单",
    productCount: "件商品",
    totalAmount: "总计",
    reviewTitle: "我的评价",
    noReviews: "暂无评价",
    reviewHint: "评价商品可获得积分！",
    noOrderHint: "开始购物，创建您的第一笔订单！",
  },
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, logout, orders } = useAuth();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("overview");
  const copy = accountCopy[language];

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/dang-nhap");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const menuItems = [
    { icon: User, label: copy.personalInfo, href: "/tai-khoan/thong-tin" },
    { icon: Package, label: copy.myOrders, href: "/tai-khoan/don-hang" },
    { icon: Heart, label: copy.favorites, href: "/tai-khoan/yeu-thich" },
    { icon: MapPin, label: copy.addresses, href: "/tai-khoan/dia-chi" },
    { icon: CreditCard, label: copy.paymentMethods, href: "/tai-khoan/thanh-toan" },
    { icon: Bell, label: copy.notifications, href: "/tai-khoan/thong-bao" },
    { icon: Settings, label: copy.settings, href: "/tai-khoan/cai-dat" },
  ];
  const membershipLevel = user.membershipLevel ?? "member";

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: t("home"), href: "/" },
            { label: copy.account, href: "/tai-khoan" },
          ]}
        />

        <div className="grid lg:grid-cols-4 gap-8 mt-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                    )}
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                  <h2 className="mt-3 font-semibold text-lg">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge
                    className={`mt-2 ${membershipColors[membershipLevel]} text-white`}
                  >
                    <Crown className="w-3 h-3 mr-1" />
                    {membershipNames[membershipLevel][language]}
                  </Badge>
                </div>

                {/* Points */}
                <div className="bg-primary/5 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{copy.points}</p>
                      <p className="text-2xl font-bold text-primary">
                        {user.points?.toLocaleString()}
                      </p>
                    </div>
                    <Gift className="w-10 h-10 text-primary/50" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    {copy.redeemPoints}
                  </Button>
                </div>

                {/* Menu */}
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm">{t("logout")}</span>
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="overview">{copy.overview}</TabsTrigger>
                <TabsTrigger value="orders">{copy.orders}</TabsTrigger>
                <TabsTrigger value="reviews">{copy.reviews}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{orders.length}</p>
                          <p className="text-sm text-muted-foreground">{copy.orders}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{user.favoriteProductIds?.length ?? 0}</p>
                          <p className="text-sm text-muted-foreground">{copy.favorites}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <Star className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">0</p>
                          <p className="text-sm text-muted-foreground">{copy.reviews}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{copy.recentOrders}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("orders")}>
                      {copy.viewAll}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.slice(0, 3).map((order) => (
                          <div
                            key={order.id}
                            className="flex items-center gap-4 p-4 border rounded-lg"
                          >
                            <div className="flex-shrink-0">
                              <Image
                                src={order.items[0].productImage || order.items[0].image || "/placeholder.jpg"}
                                alt={(order.items[0] as { name?: string; productName?: string }).name ?? order.items[0].productName}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{(order.items[0] as { name?: string; productName?: string }).name ?? order.items[0].productName}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.id} - {new Date(order.createdAt).toLocaleDateString(language === "vi" ? "vi-VN" : language === "zh" ? "zh-CN" : "en-US")}
                              </p>
                              <Badge className={statusColors[order.status]}>
                                {statusNames[order.status][language]}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-primary">
                                {order.totalAmount.toLocaleString()}d
                              </p>
                              <Button variant="outline" size="sm" className="mt-1">
                                {copy.details}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">{copy.noOrders}</p>
                        <Button className="mt-4" asChild>
                          <Link href="/san-pham">{copy.shopNow}</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>{copy.allOrders}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg overflow-hidden">
                            <div className="bg-muted/50 p-4 flex items-center justify-between">
                              <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(order.createdAt).toLocaleDateString(language === "vi" ? "vi-VN" : language === "zh" ? "zh-CN" : "en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                              <Badge className={statusColors[order.status]}>
                                {statusNames[order.status][language]}
                              </Badge>
                            </div>
                            <div className="p-4 space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                  <Image
                                    src={item.productImage || item.image || "/placeholder.jpg"}
                                    alt={(item as { name?: string; productName?: string }).name ?? item.productName}
                                    width={60}
                                    height={60}
                                    className="rounded-lg object-cover"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium">{(item as { name?: string; productName?: string }).name ?? item.productName}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {(item.unitPrice || item.price || 0).toLocaleString()}d x {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-semibold">
                                    {((item.unitPrice || item.price || 0) * item.quantity).toLocaleString()}d
                                  </p>
                                </div>
                              ))}
                            </div>
                            <div className="border-t p-4 flex items-center justify-between">
                              <p className="text-muted-foreground">
                                {order.items.length} {copy.productCount}
                              </p>
                              <div className="flex items-center gap-4">
                                <p>
                                  {copy.totalAmount}:{" "}
                                  <span className="font-bold text-primary text-lg">
                                    {order.totalAmount.toLocaleString()}d
                                  </span>
                                </p>
                                <Button variant="outline" size="sm">
                                  {copy.details}
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">{copy.noOrders}</h3>
                        <p className="text-muted-foreground mb-4">
                          {copy.noOrderHint}
                        </p>
                        <Button asChild>
                          <Link href="/san-pham">{copy.shopNow}</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>{copy.reviewTitle}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Star className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">{copy.noReviews}</h3>
                      <p className="text-muted-foreground mb-4">
                        {copy.reviewHint}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
