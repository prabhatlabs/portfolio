import { cn } from "@/lib/utils";
import { Fragment, type JSX } from "react";

/**
 * Wrap text in:
 *  - **double asterisks** for highlight
 *  - ||double pipes|| for special emphasis (e.g., metrics)
 *  - <br /> for '\n'
 */
const TextHighlighting5000 = ({
    text,
    className,
    textClassName,
    highlightedTextClassName,
    specialTextClassName,
    enableNewLine = true,
}: {
    text: string;
    className?: string;
    textClassName?: string;
    highlightedTextClassName?: string;
    specialTextClassName?: string;
    enableNewLine?: boolean;
}) => {
    text = `${text} `;
    const textArr: JSX.Element[] = [];
    let aText = "";
    let aHighlightedText = "";
    let aSpecialText = "";
    let pushHighlight = false;
    let pushSpecial = false;

    for (let i = 0; i < text.length - 1; i++) {
        // Add <br /> for '\n'
        if (text[i] === "\n") {
            if (aText) {
                textArr.push(
                    <span key={`t-${i}`} className={textClassName}>
                        {aText}
                    </span>
                );
                aText = "";
            }
            if (aHighlightedText) {
                textArr.push(
                    <span key={`h-${i}`} className={highlightedTextClassName}>
                        {aHighlightedText}
                    </span>
                );
                aHighlightedText = "";
            }
            if (aSpecialText) {
                textArr.push(
                    <span key={`s-${i}`} className={specialTextClassName}>
                        {aSpecialText}
                    </span>
                );
                aSpecialText = "";
            }
            textArr.push(enableNewLine ? <br key={`br-${i}`} /> : <Fragment key={`br-${i}`}>{" • "}</Fragment>);
            continue;
        }

        // Toggle highlight mode (** **)
        if (text[i] === "*" && text[i + 1] === "*") {
            pushHighlight = !pushHighlight;
            i++;
            continue;
        }
        // Toggle special mode (|| ||)
        if (text[i] === "|" && text[i + 1] === "|") {
            pushSpecial = !pushSpecial;
            i++;
            continue;
        }

        if (pushHighlight) {
            if (aText) {
                textArr.push(
                    <span key={`t-${i}`} className={textClassName}>
                        {aText}
                    </span>
                );
                aText = "";
            }
            if (aSpecialText) {
                textArr.push(
                    <span key={`s-${i}`} className={specialTextClassName}>
                        {aSpecialText}
                    </span>
                );
                aSpecialText = "";
            }
            aHighlightedText += text[i];
        } else if (pushSpecial) {
            if (aText) {
                textArr.push(
                    <span key={`t-${i}`} className={textClassName}>
                        {aText}
                    </span>
                );
                aText = "";
            }
            if (aHighlightedText) {
                textArr.push(
                    <span key={`h-${i}`} className={highlightedTextClassName}>
                        {aHighlightedText}
                    </span>
                );
                aHighlightedText = "";
            }
            aSpecialText += text[i];
        } else {
            if (aHighlightedText) {
                textArr.push(
                    <span key={`h-${i}`} className={highlightedTextClassName}>
                        {aHighlightedText}
                    </span>
                );
                aHighlightedText = "";
            }
            if (aSpecialText) {
                textArr.push(
                    <span key={`s-${i}`} className={specialTextClassName}>
                        {aSpecialText}
                    </span>
                );
                aSpecialText = "";
            }
            aText += text[i];
        }
    }

    if (aText)
        textArr.push(
            <span key={`t-end`} className={textClassName}>
                {aText}
            </span>
        );
    if (aHighlightedText)
        textArr.push(
            <span key={`h-end`} className={highlightedTextClassName}>
                {aHighlightedText}
            </span>
        );
    if (aSpecialText)
        textArr.push(
            <span key={`s-end`} className={specialTextClassName}>
                {aSpecialText}
            </span>
        );

    return <p className={cn(className)}>{textArr}</p>;
};

export default TextHighlighting5000;
