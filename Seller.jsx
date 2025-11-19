import React,{useState,useEffect,useRef} from 'react'
import Card from '../Admin/Card_ui'
import { Chart } from 'primereact/chart';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { RadioButton } from "primereact/radiobutton";
import Navbar from './Navbar';
import 'primeicons/primeicons.css';
import axios from 'axios'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
        


const Seller = () => {
    const cardData = [
    {
      title: "Orders Completed",
      value: "2.5K",
      icon: "pi pi-cart-plus",
      iconBg: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: "100K",
      icon: "pi pi-users",
      iconBg: "bg-sky-500",
    },
    {
      title: "Revenue Generated",
      value: "$2.5M",
      icon: "pi pi-dollar",
      iconBg: "bg-green-500",
    },
    {
      title: "Sales",
      value: "$5M",
      icon: "pi pi-chart-line",
      iconBg: "bg-orange-500",
    },
  ];


    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [pieData, setPieData] = useState({});
    const [piechartOptions, setpieChartOptions] = useState({});

    const[form,setForm]=useState({
      productName: "",
      desc: "",
      qty: "",
      price: "",
      category: "", // shoes or clothes
      image: null
    })

      const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    const handleCategoryChange = (value) => {
    setForm({ ...form, category: value });
    };

    const handleImage = (e) => {
  setForm({ ...form, image: e.target.files[0] });
};

//     const handleSubmit = async () => {

//   if (!form.category) {
//     alert("Please select a category");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("productName", form.productName);
//   formData.append("desc", form.desc);
//   formData.append("qty", form.qty);
//   formData.append("price", form.price);
//   formData.append("image", form.image);

//   let apiURL = "";

//   if (form.category === "shoes") {
//     apiURL = "http://localhost:4004/shoes";
//   } else if (form.category === "clothes") {
//     apiURL = "http://localhost:4004/clothes";
//   }

//   try {
//     await axios.post(apiURL, formData, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });
//     alert("Product added successfully 🎉");
//   } catch (error) {
//     console.log(error);
//     alert("Error adding product");
//   }
// };



    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Order Delivered',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Order Returned',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Clothe', 'Shoe'],
            datasets: [
                {
                    data: [5400, 8000],
                    backgroundColor: [
                        '#FFA500',  // Orange
                    '#4CAF50'   // Green
                    ],
                    hoverBackgroundColor: [
                       '#FF8C00',  // Darker Orange on hover
                    '#45A049'   // Darker Green on hover
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setPieData(data);
       setpieChartOptions(options);
    }, []);

      // const toast = useRef(null);

    // const onUpload = () => {
    //     toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    // };

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.category) {
    alert("Please select a category");
    return;
  }

  const formData = new FormData();
  formData.append("productName", form.productName);
  formData.append("price", form.price);
  formData.append("image", form.image);

  let url = "";

  if (form.category === "shoes") {
    url = "http://localhost:4004/product";
    formData.append("qty", form.qty);
    formData.append("desc", form.desc);
  }

  if (form.category === "clothes") {
    url = "http://localhost:4004/cloth";
  }

  try {
    const res = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

     toast.success(("Product Added Successfully!!"),{
           position: "top-right",
          autoClose: 2000,
        });
    console.log(res.data);
    e.currentTarget.reset();
    // setForm({
    //   productName: "",
    //   desc: "",
    //   qty: "",
    //   price: "",
    //   category: "",
    //   image: null
    // });
  } catch (error) {
    console.log(error);
    toast.error("Error adding product");
  }
};



  return (
    <div>
   
      <Navbar className="fixed top-0"/>
  
    
  <div className="p-4 md:p-8">
    
    <div className="collection text-center mb-6 text-2xl font-semibold">
      Madhav Ecommerce Sales Dashboard
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon}
          iconBg={item.iconBg}
        />
      ))}
    </div>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

      {/* Bar Chart */}
      <div className="bg-white rounded-xl p-6 shadow-md border w-full">
        <h2 className="collection mb-4">Order Delivered Vs Returned</h2>
        <div className="h-90">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Centered Pie Chart */}
      <div className="bg-white rounded-xl p-6 shadow-md border flex flex-col items-center">
        <h2 className="collection mb-4">Products Data</h2>

        <div className="flex justify-center w-full">
          <Chart
            type="pie"
            data={pieData}
            options={piechartOptions}
            className="w-60 h-60 md:w-72 md:h-72"
          />
        </div>
      </div>

    </div>

    {/*Product Upload */}
      {/* Product Upload */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-10">

  {/* Form Card */}
  <div className="p-6 bg-white shadow-xl rounded-2xl border">

    <h2 className="collection">
      Add New Product
    </h2>

      <form action="" onSubmit={handleSubmit}>

    <div className="space-y-5">

      {/* Product Name */}
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-box"></i>
        </span>
        <InputText
          name="productName"
          value={form.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full rounded-xl text-lg"
        />

      </div>

      {/* Description */}
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-file-edit"></i>
        </span>
        <InputText
          name="desc"
          value={form.desc}
          onChange={handleChange}
          placeholder="Description"
          className="w-full rounded-xl text-lg"
        />

      </div>

      {/* Quantity */}
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-warehouse"></i>
        </span>
        <InputText
          name="qty"
          value={form.qty}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full"
        />

      </div>

      {/* Price */}
      <div className="p-inputgroup">
        <span className="p-inputgroup-addon">
          <i className="pi pi-tag"></i>
        </span>
        <InputText
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full"
        />

      </div>

      {/* Radio Buttons */}
          <div className="mb-4">
            <span className="text-sm font-medium block mb-2">Category</span>

            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <RadioButton inputId="rb1" name="category" value="shoes" onChange={() => handleCategoryChange("shoes")} 
  checked={form.category === "shoes"}  />
                <label htmlFor="rb1" className="ml-2">Shoes</label>
              </div>

              <div className="flex items-center gap-2">
                <RadioButton inputId="rb2" name="category" value="clothes"  onChange={() => handleCategoryChange("clothes")} 
  checked={form.category === "clothes"}  />
                <label htmlFor="rb2" className="ml-2">Clothes</label>
              </div>
            </div>
          </div>


                {/* Image Upload */} <div className="p-inputgroup">
                 <span className="p-inputgroup-addon"> <i className="pi pi-camera"></i> </span> 
                 <InputText placeholder="Upload Image URL" className="w-full rounded-xl text-lg" type="file" onChange={handleImage} /> </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
  label="Submit Product"
  type="submit"
  className="p-2 p-button-lg bg-sky-400 hover:bg-sky-700 text-white border-none w-1/2 rounded-2xl"
/>
      </div>

    </div>
    </form>
  </div>

  {/* Right Side Optional Image / Content */}
  <div className="flex items-center justify-center bg-linear-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-xl p-8">
    <h2 className="text-3xl font-bold text-center">
      Manage Your Store  
      <br /> Add Products Easily 🚀
    </h2>
  </div>

</div>
 <div className='grid grid-cols-2 gap-6'>
    <div className="bg-white p-6 rounded-xl shadow-md border mb-10">
            <h2 className="font-semibold text-gray-800 text-lg mb-4">
              Top 3 Customers
            </h2>

            <ul className="border-l-2 border-blue-500 pl-4">
              <li className="mb-5">
                <strong className="text-blue-600">Riddhi</strong> 
              </li>
              <li className="mb-5">
                <strong className="text-blue-600">Aman</strong> 
              </li>
              <li className="mb-5">
                <strong className="text-blue-600">Priya</strong> 
              </li>
            </ul>
          </div>
          <div>
            <div className='bg-white p-6 rounded-xl shadow-md border mb-10'>
                <div className='collection'>Top 3 Products</div>
            <div className='grid grid-cols-3 gap-3'>
    <img src="/clothes/p_img1.png" className="w-full h-40 object-cover rounded-full" />
    <img src="/clothes/p_img2.png" className="w-full h-40 object-cover rounded-full" />
    <img src="/clothes/p_img3.png" className="w-full h-40 object-cover rounded-full" />
</div>
            </div>
          </div>
 </div>

        
  </div>
  </div>
);

}

export default Seller
