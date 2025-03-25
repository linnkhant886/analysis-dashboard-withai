"use client";

import React, {  useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { motion } from "framer-motion";
import {
  format,
  addMonths,
  subMonths,
  isSameMonth,
  isSameWeek,
  isSameDay,
  differenceInYears,
} from "date-fns";
import {
  Gift,
  CreditCard,
  CalendarIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

interface Guest {
  id: number;
  name: string;
  birthday: Date;
  email: string;
  phone: string;
  vip: boolean;
  paymentMethod: string;
}


// Mock data - replace with actual data from your API
const allGuestBirthdays = [
  {
    id: 1,
    name: "Alice Johnson",
    birthday: new Date(1990, 0, 15),
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    vip: true,
    paymentMethod: "Credit Card",
  },
  {
    id: 2,
    name: "Bob Smith",
    birthday: new Date(1985, 1, 22),
    email: "bob@example.com",
    phone: "+1 (555) 234-5678",
    vip: false,
    paymentMethod: "PayPal",
  },
  {
    id: 3,
    name: "Charlie Brown",
    birthday: new Date(1992, 2, 5),
    email: "charlie@example.com",
    phone: "+1 (555) 345-6789",
    vip: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 4,
    name: "Diana Prince",
    birthday: new Date(1988, 3, 18),
    email: "diana@example.com",
    phone: "+1 (555) 456-7890",
    vip: true,
    paymentMethod: "Apple Pay",
  },
  {
    id: 5,
    name: "Edward Cullen",
    birthday: new Date(1995, 4, 30),
    email: "edward@example.com",
    phone: "+1 (555) 567-8901",
    vip: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 6,
    name: "Fiona Gallagher",
    birthday: new Date(1991, 5, 2),
    email: "fiona@example.com",
    phone: "+1 (555) 678-9012",
    vip: false,
    paymentMethod: "Google Pay",
  },
  {
    id: 7,
    name: "George Wilson",
    birthday: new Date(1987, 6, 15),
    email: "george@example.com",
    phone: "+1 (555) 789-0123",
    vip: true,
    paymentMethod: "Credit Card",
  },
  {
    id: 8,
    name: "Hannah Baker",
    birthday: new Date(1993, 7, 22),
    email: "hannah@example.com",
    phone: "+1 (555) 890-1234",
    vip: false,
    paymentMethod: "PayPal",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    birthday: new Date(1989, 8, 5),
    email: "ian@example.com",
    phone: "+1 (555) 901-2345",
    vip: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 10,
    name: "Julia Roberts",
    birthday: new Date(1994, 9, 18),
    email: "julia@example.com",
    phone: "+1 (555) 012-3456",
    vip: true,
    paymentMethod: "Apple Pay",
  },
  {
    id: 11,
    name: "Kevin Hart",
    birthday: new Date(1986, 10, 30),
    email: "kevin@example.com",
    phone: "+1 (555) 123-4567",
    vip: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 12,
    name: "Laura Palmer",
    birthday: new Date(1990, 11, 2),
    email: "laura@example.com",
    phone: "+1 (555) 234-5678",
    vip: false,
    paymentMethod: "Google Pay",
  },
  // Current month birthdays (for testing)
  {
    id: 13,
    name: "Michael Scott",
    birthday: new Date(1988, new Date().getMonth(), 5),
    email: "michael@example.com",
    phone: "+1 (555) 345-6789",
    vip: true,
    paymentMethod: "Credit Card",
  },
  {
    id: 14,
    name: "Nancy Wheeler",
    birthday: new Date(1992, new Date().getMonth(), 12),
    email: "nancy@example.com",
    phone: "+1 (555) 456-7890",
    vip: false,
    paymentMethod: "PayPal",
  },
  {
    id: 15,
    name: "Oscar Martinez",
    birthday: new Date(1985, new Date().getMonth(), 18),
    email: "oscar@example.com",
    phone: "+1 (555) 567-8901",
    vip: false,
    paymentMethod: "Credit Card",
  },
  {
    id: 16,
    name: "Pam Beesly",
    birthday: new Date(1990, new Date().getMonth(), 25),
    email: "pam@example.com",
    phone: "+1 (555) 678-9012",
    vip: true,
    paymentMethod: "Apple Pay",
  },
];

// Payment method options
const paymentMethods = [
  { id: "credit-card", name: "Credit Card" },
  { id: "paypal", name: "PayPal" },
  { id: "apple-pay", name: "Apple Pay" },
  { id: "google-pay", name: "Google Pay" },
  { id: "bank-transfer", name: "Bank Transfer" },
  { id: "cash", name: "Cash" },
];

// Birthday gift packages
const giftPackages = [
  {
    id: 1,
    name: "Basic Birthday Card",
    price: 5.99,
    description: "A simple birthday card with a personalized message",
  },
  {
    id: 2,
    name: "Birthday Cake",
    price: 29.99,
    description: "A delicious birthday cake with custom message",
  },
  {
    id: 3,
    name: "Premium Gift Basket",
    price: 49.99,
    description: "Luxury gift basket with wine, chocolates, and more",
  },
  {
    id: 4,
    name: "VIP Experience",
    price: 99.99,
    description:
      "Special VIP treatment including room decoration and champagne",
  },
];

export default function GuestBirthdayDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"weekly" | "monthly" | "yearly">(
    "monthly"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
 
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [selectedGiftPackage, setSelectedGiftPackage] = useState<number | null>(
    null
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  const [selectedGuestId, setSelectedGuestId] = useState<number | null>(null);

  // Filter birthdays based on selected date and view mode
  const filterBirthdays = (
    guests: Guest[],
    date: Date,
    mode: "weekly" | "monthly" | "yearly"
  ) => {
    return guests.filter((guest) => {
      // Create a date for this year's birthday
      const thisYearBirthday = new Date(
        date.getFullYear(),
        guest.birthday.getMonth(),
        guest.birthday.getDate()
      );

      if (mode === "weekly") {
        return isSameWeek(thisYearBirthday, date);
      } else if (mode === "monthly") {
        return isSameMonth(thisYearBirthday, date);
      } else {
        // Yearly mode shows all birthdays
        return true;
      }
    });
  };

  // Filter by search query
  const filterBySearch = (guests: Guest[]) => {
    if (!searchQuery) return guests;

    const query = searchQuery.toLowerCase();
    return guests.filter(
      (guest) =>
        guest.name.toLowerCase().includes(query) ||
        guest.email.toLowerCase().includes(query) ||
        guest.phone.toLowerCase().includes(query)
    );
  };

  // Get filtered birthdays
  const filteredBirthdays = filterBySearch(
    filterBirthdays(allGuestBirthdays, selectedDate, viewMode)
  );

  // Group birthd


  // Group birthdays by payment method for the pie chart
 
  
  // Colors for the pie chart
 

  // Handle month navigation
  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setSelectedDate(subMonths(selectedDate, 1));
    } else {
      setSelectedDate(addMonths(selectedDate, 1));
    }
  };

  // Handle gift selection
  const handleGiftSelection = (giftId: number) => {
    setSelectedGiftPackage(giftId);
  };

  // Handle payment form submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment logic would go here
    if (selectedGuest) {
      alert(
        `Payment processed for ${selectedGuest.name} using ${selectedPaymentMethod}`
      );
    }
    setShowPaymentForm(false);
    setSelectedGuest(null);
  };


  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Guest Birthday Dashboard</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming Birthdays</TabsTrigger>
          <TabsTrigger value="gifts">Birthday Gifts</TabsTrigger>
        </TabsList>

        {/* Upcoming Birthdays Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/3"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Birthday View Controls</CardTitle>
                  <CardDescription>
                    Filter and search for birthdays
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth("prev")}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex-1 text-center font-medium">
                      {format(selectedDate, "MMMM yyyy")}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth("next")}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Select
                      value={viewMode}
                      onValueChange={(value: "weekly" | "monthly" | "yearly") =>
                        setViewMode(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select view mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">All Birthdays</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={() => setSelectedDate(new Date())}>
                      Today
                    </Button>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search guests..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  
                </CardContent>
              </Card>
            </motion.div>

            {/* Birthday List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full md:w-2/3"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>
                      {viewMode === "weekly"
                        ? "This Week's"
                        : viewMode === "monthly"
                        ? "This Month's"
                        : "All"}{" "}
                      Birthdays
                    </CardTitle>
                    <CardDescription>
                      {filteredBirthdays.length} guests found
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {filteredBirthdays.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Birthday</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBirthdays.map((guest) => {
                          const isSelected = selectedGuestId === guest.id;
                          const thisYearBirthday = new Date(
                            selectedDate.getFullYear(),
                            guest.birthday.getMonth(),
                            guest.birthday.getDate()
                          );
                          const age = differenceInYears(
                            new Date(),
                            guest.birthday
                          );
                          const upcomingAge = age + 1;
                          const isToday = isSameDay(
                            thisYearBirthday,
                            new Date()
                          );

                          return (
                            <TableRow
                              key={guest.id}
                              className={isToday ? "bg-primary/10" : ""}
                            >
                              <TableCell className="font-medium">
                                {guest.name}
                                {guest.vip && (
                                  <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                    VIP
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                {format(thisYearBirthday, "MMMM d")}
                                {isToday && (
                                  <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                    Today
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>{upcomingAge}</TableCell>
                              <TableCell>
                                <div className="text-sm">{guest.email}</div>
                                <div className="text-xs text-muted-foreground">
                                  {guest.phone}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div
                                    className={`mr-2 h-2 w-2 rounded-full ${
                                      guest.paymentMethod
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                  <span className="text-xs">
                                    {guest.paymentMethod || "No payment method"}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={isSelected ? "bg-primary hover:bg-primary/80 hover:text-white text-white" : ""}
                                    onClick={() => {
                                      setActiveTab("gifts");
                                      setSelectedGuestId(guest.id);
                                      setSelectedGuest(guest);
                                    }}
                                  >
                                    <Gift className="h-4 w-4 mr-1" />
                                    Send Gift
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <CalendarIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">
                        No birthdays found
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try changing your filters or search query
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        
        {/* Birthday Gifts Tab */}
        <TabsContent value="gifts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Birthday Gift Packages</CardTitle>
                  <CardDescription>
                    Select a gift package to send to a guest
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {giftPackages.map((gift) => (
                      <div
                        key={gift.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedGiftPackage === gift.id
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => handleGiftSelection(gift.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{gift.name}</h3>
                          <div className="text-lg font-bold">
                            ${gift.price.toFixed(2)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {gift.description}
                        </p>
                        {selectedGiftPackage === gift.id && (
                          <div className="mt-2 flex justify-end">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedGiftPackage(null)}
                  >
                    Reset Selection
                  </Button>
                  <Button
                    disabled={!selectedGiftPackage || !selectedGuest}
                    onClick={() => setShowPaymentForm(true)}
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Send Gift
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Selected Guest</CardTitle>
                  <CardDescription>Guest to receive the gift</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedGuest ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold">
                            {selectedGuest.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">
                            {selectedGuest.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {selectedGuest.email}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Birthday:</span>{" "}
                          {format(selectedGuest.birthday, "MMMM d, yyyy")}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Age:</span>{" "}
                          {differenceInYears(
                            new Date(),
                            selectedGuest.birthday
                          )}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Phone:</span>{" "}
                          {selectedGuest.phone}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Status:</span>{" "}
                          {selectedGuest.vip ? "VIP Guest" : "Regular Guest"}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Payment Method:</span>{" "}
                          {selectedGuest.paymentMethod || "None"}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No guest selected</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select a guest from the Upcoming Birthdays tab
                      </p>
                    </div>
                  )}
                </CardContent>
                {selectedGuest && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedGuest(null)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear Selection
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          </div>
          s{/* Payment Form Modal */}
          {showPaymentForm && selectedGuest && selectedGiftPackage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-background rounded-lg shadow-lg w-full max-w-md"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Complete payment for {selectedGuest.name}&apos;s birthday gift
                  </p>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gift-package">
                        Selected Gift Package
                      </Label>
                      <div className="p-3 border rounded-md bg-muted/50">
                        <div className="font-medium">
                          {
                            giftPackages.find(
                              (g) => g.id === selectedGiftPackage
                            )?.name
                          }
                        </div>
                        <div className="text-sm text-muted-foreground">
                          $
                          {giftPackages
                            .find((g) => g.id === selectedGiftPackage)
                            ?.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment-method">Payment Method</Label>
                      <RadioGroup
                        value={selectedPaymentMethod}
                        onValueChange={setSelectedPaymentMethod}
                        className="grid grid-cols-2 gap-2"
                      >
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label
                              htmlFor={method.id}
                              className="cursor-pointer"
                            >
                              {method.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {selectedPaymentMethod === "credit-card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPaymentForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={!selectedPaymentMethod}>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Complete Payment
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
