import { FormControl } from "@angular/forms";

export function restrictedWords(
  words: string[]
): (control: FormControl) => { [key: string]: any } | null {
  return (control: FormControl): { [key: string]: any } | null => {
    if (!words) {
      return null;
    }
    const invalidWords = words.filter((x) => control.value.includes(x));
    return !!invalidWords.length
      ? { restrictedWords: invalidWords.join(", ") }
      : null;
  };
}
