import Product from "../product/Product";
import Item from "../product/Item";
import Cart from "../product/Cart";
import Login from "../login/Login";
import Sign from "../singup/Sign";
import Home from "../home/Home";
import Service from "../services/Service";
import Cloth from "../product/Cloth";
import Dashboard from "../../Admin/Dashboard";
import Seller from "../../Vendor/Seller";
import Register from "../../Vendor/Register";
import Verify from "../../Vendor/Verify";
import Seller_Management from "../../Admin/Seller_Management";
import Buyer_Management from "../../Admin/Buyer_Management";
import Page_const from "../../Admin/Page_const";
import Calendar from "../../Admin/Calender";

const appRoute=[
    {path:"/",Component:Home,name:"Home",role:"buyer"},
    {path:"/product",Component:Product,name:"Shoe",role:"buyer"},
    {path:"/cloth",Component:Cloth,name:"Cloth",role:"buyer"},
    {path:"/services",Component:Service,name:"Service",role:"buyer"},
    {path:"/cart",Component:Cart},
    {path:"/product/:id",Component:Item},
    {path:"/sign",Component:Sign},
    {path:"/login",Component:Login},
    {path:"/dashboard",Component:Dashboard,role:"admin"},
    {path:"/seller",Component:Seller,role:"seller"},
    {path:"/register",Component:Register},
    {path:"/verify",Component:Verify},
    {path:"/seller_management",Component:Seller_Management},
    {path:"/buyer_management",Component:Buyer_Management},
    {path:"/page",Component:Page_const},
    {path:"/calender",Component:Calendar}
]

export default appRoute