export const parseFormData = (formData: FormData) =>
  Array.from(formData.entries())
    // in server actions, formData will include additional $ACTION_ properties
    .filter(([k]) => !k.startsWith("$ACTION_"))
    .reduce<Record<string, FormDataEntryValue | FormDataEntryValue[]>>(
      (acc, [k, v]) => {
        if (!acc[k]) {
          const values = formData.getAll(k);
          acc[k] = values.length === 1 ? v : values;
        }
        return acc;
      },
      {}
    );
