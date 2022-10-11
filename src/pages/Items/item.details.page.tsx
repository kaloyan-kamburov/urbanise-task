/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";

//components
import Loader from "../../components/Loader/loader.component";
import TopBar from "../../components/TopBar/topBar.component";

//state elements
import { updateItem } from "../../state/items/item.actions";
import { Item, Unit } from "../../state/items/item.types";
import { ItemDetails } from "./item.details.type";
import { selectRegions } from "../../state/regions/regions.selector";
import { Region } from "../../state/regions/regions.types";
import { Manager } from "../../state/managers/managers.types";

//utils
import axios from "../../utils/api/api";

interface Props {}

const ItemDetailsPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [units, setUnits] = useState<Unit[]>([]);

  const regions = useSelector(selectRegions);

  const [itemManager, setItemManager] = useState<number | string | null>(null);
  const [itemPreviousManager, setItemPreviousManager] = useState<
    number | string | null
  >(null);

  // const [initialFormData, setInitialFormData] = useState<ItemDetails>();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ItemDetails>({
    defaultValues: {
      planRegistered: new Date(),
    },
  });

  const { refetch, isLoading } = useQuery(
    "getItemData",
    async () => await axios.get(`/properties/${id}`),
    {
      onSuccess: (data: AxiosResponse<ItemDetails>) => {
        setUnits(data?.data?.units || []);
        reset({ ...data.data, region: data.data.region });
        setItemManager(data?.data?.manager);
        setItemPreviousManager(data?.data?.previousManager);
      },
    }
  );

  const { refetch: getItemManager, isLoading: isLoadingItemManager } = useQuery(
    "getItemManager",
    async () => await axios.get(`/manager/${itemManager}`),

    {
      onSuccess: (data: AxiosResponse<Manager>) => {
        reset({
          ...getValues(),
          manager: `${data.data?.firstName} ${data.data?.lastName}`,
        });
      },
    }
  );

  const {
    refetch: getItemPreviousManager,
    isLoading: isLoadingItemPreviousManager,
  } = useQuery(
    "getItemPreviousManager",
    async () => await axios.get(`/manager/${itemPreviousManager}`),
    {
      onSuccess: (data: AxiosResponse<Manager>) => {
        reset({
          ...getValues(),
          previousManager: `${data.data.firstName} ${data.data.lastName}`,
        });
      },
    }
  );

  useEffect(() => {
    if (itemManager !== null) {
      getItemManager();
    }
  }, [itemManager]);

  useEffect(() => {
    if (itemPreviousManager !== null) {
      getItemPreviousManager();
    }
  }, [itemPreviousManager]);

  const updateItemDetails = useMutation(
    async (item: ItemDetails) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res: AxiosResponse<Item> = await axios.put(`/properties/${id}`, {
        item,
      });
      // return res.data; <-- for the demo purposes I'm returning item
      return { id: "1", ...item };
    },
    {
      onSuccess: ({ id, name, plan, units, city, region, manager }) => {
        toast.success("Item updated");
        // reset();
        const newItem: Item = { id, name, plan, units, city, region, manager };
        dispatch(updateItem(newItem));
      },
    }
  );

  const onSubmit = (values: ItemDetails) => {
    updateItemDetails.mutate(values);
  };

  useEffect(() => {
    refetch();
  }, []);

  return isLoading ||
    isLoadingItemManager ||
    isLoadingItemPreviousManager ||
    (updateItemDetails.isLoading && !updateItemDetails.isSuccess) ? (
    <Loader />
  ) : (
    <>
      <TopBar>
        <button onClick={() => navigate(-1)}>go back</button>
        <h1>Edit item</h1>
      </TopBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name*</label>
          <input
            {...register("name", { required: "This field is required" })}
          />
          <span className="error">{errors?.name?.message || null}</span>
        </div>
        <div>
          <label htmlFor="plan">Plan</label>
          <input {...register("plan")} />
        </div>
        <div>
          <label htmlFor="units">Units</label>
          <select {...register("units")} multiple>
            {units.map((unit: Unit) => (
              <option key={unit.id}>{unit.type}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input {...register("city")} />
        </div>
        <div>
          <label htmlFor="region">Region</label>
          <select {...register("region")}>
            {regions.map((region: Region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="manager">Manager</label>
          <input {...register("manager")} />
        </div>
        <div>
          <label htmlFor="previousManager">Previous manager</label>
          <input {...register("previousManager")} />
        </div>
        <div>
          <label htmlFor="managementCompany">Management company</label>
          <input {...register("managementCompany")} />
        </div>
        <div>
          <label htmlFor="planRegistered">Plan registered</label>
          <Controller
            control={control}
            name="planRegistered"
            render={({ field }) => (
              <>
                <DatePicker
                  onChange={(date: Date) => field.onChange(new Date(date))}
                  dateFormat="DD-MM-YYYY"
                  selected={
                    field?.value instanceof Date ? new Date(field.value) : null
                  }
                  value={new Date(field.value).toISOString()}
                />
              </>
            )}
          />
        </div>
        {/* <div>
          <label htmlFor="planRegistered">Plan Registered</label>
          <input {...register("planRegistered")} />
        </div> */}
        <div>
          <label htmlFor="address">Address</label>
          <input {...register("address")} />
        </div>
        <div>
          <label htmlFor="account">Account</label>
          <input {...register("account")} />
        </div>
        <div>
          <label htmlFor="abn">ABN</label>
          <input {...register("abn")} />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </>
  );
};

export default ItemDetailsPage;
