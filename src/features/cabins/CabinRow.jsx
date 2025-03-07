import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";

// v1
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  //
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => DeleteCabin(id),
    onSuccess: () => {
      toast.success("cabin is  successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return (
    <>
      <TableRow role="row">
        <img src={image} alt="cabin-img" />
        {/* {console.log(image)} */}
        <Cabin>{name}</Cabin>
        <div>fits up to {maxCapacity}</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button
            onClick={() => {
              mutate(id);
            }}
            disabled={isLoading}
          >
            Delete
          </button>
        </div>
      </TableRow>
      <div>{showForm && <CreateCabinForm cabinToEdit={cabin} />}</div>
    </>
  );
}

export default CabinRow;
