/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

//store items
import { setItemList, deleteItem } from "../../state/items/item.actions";
import { selectItems } from "../../state/items/item.selector";
import { Item } from "../../state/items/item.types";
import { setRegionsList } from "../../state/regions/regions.actions";
import { selectRegions } from "../../state/regions/regions.selector";
import { Region } from "../../state/regions/regions.types";

//components
import Loader from "../../components/Loader/loader.component";

//utils
import axios from "../../utils/api/api";
import TopBar from "../../components/TopBar/topBar.component";
import ModalWrapper from "../../components/Modal/modal.component";

interface Props {}

const ItemsListPage: React.FC<Props> = () => {
  const abortController = new AbortController();
  const signal = abortController.signal;
  const dispatch = useDispatch();

  const items = useSelector(selectItems);
  const regions = useSelector(selectRegions);
  const [itemForDelete, setItemForDelete] = useState<string | null>("");
  const [loadingItem, setLoadingItem] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [errorItem, setErrorItem] = useState<{ [key: string]: boolean }>({});
  const [filterText, setFilterText] = useState<string>("");
  const [filterSelect, setFilterSelect] = useState<string | number | undefined>(
    undefined
  );
  const navigate = useNavigate();

  //function to get manager separately
  const getItemManager = async (item: Item, itemList: Item[]) => {
    const newItemList = itemList;
    setLoadingItem({
      ...loadingItem,
      [item.id]: true,
    });
    try {
      const { data } = await axios.get(`manager/${item.manager}`);

      const itemIndex = newItemList.findIndex((el: Item) => el.id === item.id);

      if (itemIndex > -1) {
        newItemList[
          itemIndex
        ].managerName = `${data?.firstName} ${data?.lastName};`;
        newItemList[itemIndex].managedSince = data?.managedSince || "";
      }
      dispatch(setItemList(newItemList));

      setErrorItem({
        ...errorItem,
        [item.id]: false,
      });
    } catch (e) {
      setErrorItem({
        ...errorItem,
        [item.id]: true,
      });
    } finally {
      setLoadingItem({
        ...loadingItem,
        [item.id]: false,
      });
    }
  };

  //query for get all items
  const {
    refetch: getItems,
    isLoading: isLoadingItems,
    isError: isErrorItems,
  } = useQuery(
    "getItems",
    async () => await axios.get("/properties", { signal }),
    {
      onSuccess: (data: AxiosResponse<Item[]>) => {
        const newItemList = data.data || [];

        if (newItemList.length) {
          newItemList.forEach((item: Item) => {
            getItemManager(item, newItemList);
          });
        }
      },
    }
  );

  //query for get all regions
  const {
    refetch: getRegions,
    isLoading: isLoadingRegions,
    isError: isErrorRegions,
  } = useQuery(
    "getRegions",
    async () => await axios.get("/regions", { signal }),
    {
      onSuccess: (data: AxiosResponse<Region[]>) => {
        dispatch(setRegionsList(data.data));
      },
    }
  );

  //query for remove items
  const removeItem = useMutation(
    async (itemId: string) => {
      await axios.delete(`/properties/${itemId}`, { signal });
      return itemId;
    },
    {
      onSuccess: (itemId: string) => {
        dispatch(deleteItem(itemId));
        setItemForDelete(null);
        toast.success("Item deleted");
      },
    }
  );

  useEffect(() => {
    //check if items and regions are not loaded (in case page is open directly)
    !items.length && getItems();
    !regions.length && getRegions();

    return () => abortController.abort();
  }, []);

  return isLoadingItems || isLoadingRegions ? (
    <Loader />
  ) : isErrorItems || isErrorRegions ? (
    <>
      Error getting data
      <button
        onClick={() => {
          isErrorItems && getItems();
          isErrorRegions && getRegions();
        }}
      >
        Retry
      </button>
    </>
  ) : (
    <>
      <TopBar>
        <h1>Items</h1>
        <button onClick={() => navigate("/items/create")}>Create item</button>
      </TopBar>
      {!!items.length ? (
        <>
          <div>
            <input
              placeholder="name or plan number"
              value={filterText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
            />
            {Array.isArray(regions) && (
              <select
                value={filterSelect}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setFilterSelect(e.target.value);
                }}
              >
                <option value="">No region</option>
                {regions.map((region: Region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <td>Property name</td>
                <td>Plan number</td>
                <td>Unit count</td>
                <td>City</td>
                <td>Region</td>
                <td>Manager</td>
                <td>Managed since</td>
                <td style={{ width: "110px", textAlign: "center" }}>Action</td>
              </tr>
            </thead>
            <tbody>
              {items
                .filter(
                  (item: Item) =>
                    item.name.includes(filterText) ||
                    `${item.plan}`.includes(filterText)
                )
                .filter(
                  (item: Item) =>
                    `${item.region}` === filterSelect || !filterSelect
                )
                .map(
                  (
                    {
                      id,
                      name,
                      plan,
                      units,
                      city,
                      region,
                      manager,
                      managerName,
                      managedSince,
                    }: Item,
                    index: number
                  ) => (
                    <tr key={`${id}${index}`}>
                      {loadingItem[id] ? (
                        <td colSpan={8}>Loading item manager</td>
                      ) : errorItem[id] ? (
                        <>
                          <td colSpan={7}>
                            Error loading item manager
                            <button
                              onClick={() =>
                                getItemManager(
                                  {
                                    id,
                                    name,
                                    plan,
                                    units,
                                    city,
                                    region,
                                    manager,
                                    managerName,
                                    managedSince,
                                  },
                                  items
                                )
                              }
                            >
                              Retry
                            </button>
                          </td>
                          <td>
                            <button onClick={() => navigate(`/items/${id}`)}>
                              Edit
                            </button>
                            <button onClick={() => setItemForDelete(id)}>
                              Delete
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{name}</td>
                          <td>{plan}</td>
                          <td>{Array.isArray(units) ? units.length : units}</td>
                          <td>{city}</td>
                          <td>
                            {regions.find((reg: Region) => reg.id === region)
                              ?.name || region}
                          </td>
                          <td>{managerName}</td>
                          <td>{managedSince}</td>
                          <td>
                            <button onClick={() => navigate(`/items/${id}`)}>
                              Edit
                            </button>
                            <button onClick={() => setItemForDelete(id)}>
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </>
      ) : (
        <div>No records</div>
      )}
      {itemForDelete && (
        <ModalWrapper>
          <div className="modal-body">
            Do you want to delete this item?
            <br />
            <div>
              <button
                onClick={() => removeItem.mutate(itemForDelete)}
                disabled={removeItem.isLoading}
              >
                yes
              </button>
              <button
                onClick={() => setItemForDelete(null)}
                disabled={removeItem.isLoading}
              >
                no
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default ItemsListPage;
