import { AutoIt } from './autoit';

describe('AutoIt JS', () => {
  it('should have every AutoIt method mapped', () => {
    const au3 = new AutoIt();

    const methods = Object.getOwnPropertyNames(AutoIt.prototype)
      .filter((method) => method !== 'constructor')
      .filter((method) => method[0] === method[0].toUpperCase());

    vi.spyOn(au3, 'load').mockImplementation(function () {
      // @ts-expect-error - Mocking a private property
      this.lib = {
        func: () => () => true,
      };
    });

    au3.load();

    let report = '';

    for (const method of methods) {
      try {
        // @ts-expect-error - This is a dynamic call
        au3[method]();

        report += `- [x] ${method}\n`;
      } catch (error) {
        if (error.message === 'Unimplemented') {
          report += `- [ ] ${method}\n`;
        } else {
          report += `- [x] ${method}\n`;
        }
      }
    }

    const implementedCount = report.match(/- \[x\]/g)?.length ?? 0;

    console.log('Progress:', implementedCount, '/', methods.length);
    console.log(report);

    expect(implementedCount).toBe(methods.length);
  });
});
