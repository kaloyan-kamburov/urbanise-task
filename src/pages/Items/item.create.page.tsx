/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";

import { ItemDetails } from "./item.details.type";
import { addItem } from "../../state/items/item.actions";
import { Item } from "../../state/items/item.types";
import { Region } from "../../state/regions/regions.types";
import { setRegionsList } from "../../state/regions/regions.actions";
import { selectRegions } from "../../state/regions/regions.selector";
import Loader from "../../components/Loader/loader.component";
import axios from "../../utils/api/api";
import TopBar from "../../components/TopBar/topBar.component";

interface Props {}

const ItemCreatePage: React.FC<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regions = useSelector(selectRegions);

  const {
    reset,
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ItemDetails>();

  //query for create item
  const createItem = useMutation(
    async (item: ItemDetails) => {
      const res: AxiosResponse<Item> = await axios.post(`/properties`, {
        item,
      });
      return res.data;
    },
    {
      onSuccess: ({ id, name, plan, units, city, region, manager }) => {
        toast.success("Item added");
        reset();
        const newItem: Item = { id, name, plan, units, city, region, manager };
        dispatch(addItem(newItem));
      },
    }
  );

  //query for getting regions
  const {
    refetch: getRegions,
    isLoading: isLoadingRegions,
    isError: isErrorRegions,
  } = useQuery("getRegions", async () => await axios.get("/regions"), {
    onSuccess: (data: AxiosResponse<Region[]>) => {
      dispatch(setRegionsList(data.data));
    },
  });

  //submit form function
  const onSubmit = (values: ItemDetails) => {
    createItem.mutate(values);
  };

  useEffect(() => {
    //check if we already have the regions
    if (!regions.length) {
      getRegions();
    }
  }, [regions]);

  return isLoadingRegions || (createItem.isLoading && !createItem.isSuccess) ? (
    <Loader />
  ) : isErrorRegions ? (
    <>
      <button onClick={() => getRegions()}>Get regions</button>
    </>
  ) : (
    <>
      <TopBar>
        <button onClick={() => navigate(-1)}>go back</button>
        <h1>Create item</h1>
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
          <select {...register("units")}>
            <option value={0}>Residential</option>
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
              <DatePicker
                onChange={(date: Date) => field.onChange(date)}
                selected={field.value}
              />
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

export default ItemCreatePage;
