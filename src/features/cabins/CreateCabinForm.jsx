import styled from "styled-components";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const queryClient = useQueryClient();
  const { errors } = formState;
  // console.log(errors);

  const { mutate, isLoading } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("cabin has been created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });
  function onsubmit(data) {
    mutate({ ...data, image: data.image[0] });
    // console.log(data);
  }
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onsubmit, onError)}>
      <FormRow label={"cabin name"} error={errors?.name?.message}>
        <Input
          type="text"
          disabled={isLoading}
          id="name"
          {...register("name", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("maxCapacity", {
            required: "this field is required",
            min: {
              value: 1,
              message: "capacity should be at least  1 ",
            },
          })}
        />
      </FormRow>

      <FormRow label={"regularPrice"} error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isLoading}
          id="regularPrice"
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "capacity should be at least  1 ",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          type="number"
          disabled={isLoading}
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label={"Description for website"}
        error={errors?.description?.message}
        disabled={isLoading}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow
        label={"Cabin photo"}
        error={errors?.image?.message}
        disabled={isLoading}
      >
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: "this field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
