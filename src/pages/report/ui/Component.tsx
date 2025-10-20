"use client";

import { Heading } from "~/shared/ui/kit/heading";
import { Button } from "~/shared/ui/kit/button";
import { Icons } from "~/shared/ui/icons";
import { VTextAreaControl, VTextControl } from "~/shared/ui/validation-inputs";
import { Field, Form } from "react-final-form";
import { RadioGroup } from "~/shared/ui/kit";
import { storeMock } from "~/shared/api/client";
import { StoreCard } from "~/entities/store";
import { productMock } from "~/shared/api/client";
import { ProductCard } from "~/entities/product";
import Link from "next/link";

const items = [
  { name: "This item violates Sella.to ToS", value: "1" },
  { name: "This report is false", value: "2" },
];

const initialValues = {
  description: "",
  checkbox: "1",
};

export function Component() {
  const id = "7513";
  const isProduct = true;

  const onSubmit = (values: typeof initialValues) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col w-full gap-[3rem] max-w-content mx-auto px-[1rem]">
      <div className="flex justify-between items-center">
        <Heading>
          Report <span className="text-black-40">{` #${id}`}</span>
        </Heading>

        <Button colorPalette="gray" size="sm">
          Cancel
        </Button>
      </div>

      <div className="flex justify-between gap-14 max-md:flex-col max-md:gap-8">
        <div className="p-4 flex flex-col rounded-[1rem] border border-secondary bg-white/[.02] shadow-sm">
          <div
            className="flex justify-center items-center border border-secondary rounded-[1rem]
							bg-black-06 min-h-[29.5rem] relative
						"
          >
            <div className="absolute bottom-[3rem] bg-white/[.12] rounded-[100%] blur-[2.25rem] w-[80%] h-[2rem]" />

            {isProduct ? (
              <ProductCard.Composed
                className="bg-black-08 z-20"
                product={productMock}
              />
            ) : (
              <StoreCard.Composed
                className="bg-black-08 z-20"
                store={storeMock}
              />
            )}
          </div>

          <div className="w-full flex flex-col gap-4 p-4">
            <div className="text-white font-semibold text-lg">Report</div>

            <div className="text-black-40">
              <p>Report Date: 27/05/2024</p>
              <p>Report Reason: Prohibited Item</p>
            </div>

            <p className="text-black-40">
              This item is advertised as CBD hemp but actually contains a large
              amount of THC which makes it illegal in majority of countries and
              as a result, prohibited by Sella ToS.
            </p>

            <Button
              className="w-full mt-4 gap-3 items-center"
              colorPalette="gray"
              size="lg"
            >
              Open Link
              <Icons.LinkExternal />
            </Button>
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 border border-secondary rounded-[1rem] min-w-[22.5rem] h-fit">
          <div className="text-white font-semibold text-lg">Report</div>

          <Form
            initialValues={initialValues}
            onSubmit={onSubmit}
            subscription={{}}
          >
            {() => (
              <>
                <VTextControl.Root name="description">
                  <VTextAreaControl.Input
                    className="resize-none h-auto whitespace-normal"
                    rows={4}
                    placeholder="Is this Item fully in line with Sella’s&#10; Terms of Service?"
                  />
                </VTextControl.Root>

                <Field name="checkbox">
                  {({ input: { value, onChange } }) => (
                    <RadioGroup.Root value={value} onChange={onChange}>
                      {items.map((c) => (
                        <RadioGroup.Item key={c.name} value={c.value}>
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText className="data-[state=checked]:text-white">
                            {c.name}
                          </RadioGroup.ItemText>
                          <RadioGroup.ItemHiddenInput />
                        </RadioGroup.Item>
                      ))}
                    </RadioGroup.Root>
                  )}
                </Field>

                <div className="flex justify-between">
                  <span className="text-black-74">Time left</span>
                  <span className="text-yellow-100">00:59:14</span>
                </div>

                <Link href={""}>
                  <Button type="submit" variant="solid">
                    Vote
                  </Button>
                </Link>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
