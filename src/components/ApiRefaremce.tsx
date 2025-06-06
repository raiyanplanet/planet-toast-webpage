import CodeBlock from "./CodeBlock";

const ApiRefaremce = () => {
  return (
    <>
      <section className="py-24 bg-cream-25 dark:bg-stone-900">
        <div className=" px-52 max-md:px-10 flex flex-col">
          <div className=" text-center">
            <h2 className="text-3xl max-md:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6">
              API Reference
            </h2>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-md:text-sm mb-5">
              Complete guide to all available methods and options
            </p>
          </div>

          <div className="space-y-16">
            {/* Basic Methods */}
            <div>
              <h3 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-8 max-md:text-xl">
                Basic Methods
              </h3>
              <div className="flex flex-col space-y-10">
                <div className=" flex flex-col">
                  <h4 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4">
                    toast(message, options?)
                  </h4>
                  <CodeBlock
                    code={`// Basic toast
toast('Hello World!');

// With options
toast('Custom duration', { duration: 6000 });`}
                  />
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4">
                    toast.success / error / loading
                  </h4>
                  <CodeBlock
                    code={`// Success toast
toast.success('Profile updated!');

// Error toast
toast.error('Failed to save');

// Loading toast
const loadingId = toast.loading('Uploading...');
// Later dismiss it
toast.dismiss(loadingId);`}
                  />
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-stone-800 dark:text-stone-100 mb-4">
                    toast.promise
                  </h4>
                  <CodeBlock
                    code={`const saveUser = async (userData) => {
  // Your async operation
  return fetch('/api/users', { 
    method: 'POST', 
    body: JSON.stringify(userData) 
  });
};

toast.promise(saveUser(userData), {
  loading: 'Saving user...',
  success: 'User saved successfully!',
  error: 'Failed to save user'
});`}
                  />
                </div>
              </div>
            </div>

            {/* Toaster Component */}
            <div>
              <h3 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-8">
                Toaster Component
              </h3>
              <div>
                <CodeBlock
                  code={`<Toaster
  position="top-center"      // Position: top/bottom + left/center/right
  reverseOrder={false}       // Reverse the order of toasts
  gutter={8}                 // Gap between toasts
  containerStyle={{}}        // Custom container styles
  toastOptions={{            // Default options for all toasts
    duration: 4000,
    position: 'top-center'
  }}
/>`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ApiRefaremce;
